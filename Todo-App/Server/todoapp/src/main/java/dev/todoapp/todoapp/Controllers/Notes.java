package dev.todoapp.todoapp.Controllers;

import dev.todoapp.todoapp.Models.Note;
import dev.todoapp.todoapp.Models.User;
import dev.todoapp.todoapp.Repository.NoteRepository;
import dev.todoapp.todoapp.Repository.UserRepository;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Notes {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  // * the repo is providing all the methods or queries
  private NoteRepository noteRepository;

  @GetMapping(path = "/getallnotes/{userId}")
  @CrossOrigin(origins = "http://localhost:5173")
  public ResponseEntity<?> getNotes(@PathVariable String userId) {
    // * Fetching User From Users Collection Through Object-Id
    final Optional<User> user = this.userRepository.findById(userId);

    Date d = new Date();
    final Long milis = d.getTime();

    try {
      if (user.isPresent()) {
        final List<Note> allNotes = this.noteRepository.findAll();

        // * empty list
        List<Note> userNotes = new ArrayList<Note>();

        // * Filtering Notes For The Current-User Through Its {Uid} (Passed-Through-PathVariable)
        for (Note note : allNotes) {
          if (note.getOwner().equals(userId)) {
            userNotes.add(note);
          }
        }
        if (userNotes.size() > 0) {
          return new ResponseEntity<>(
            new ServerNotesResponse(
              userNotes,
              true,
              "Success, All Moments Corresponding To Current User",
              null
            ),
            HttpStatus.OK
          );
        }
        return new ResponseEntity<>(
          new ServerNotesResponse(
            userNotes,
            false,
            "Success, All Moments Corresponding To Current User",
            null
          ),
          HttpStatus.OK
        );
      }
      return new ResponseEntity<>(
        new ServerNotesResponse(
          null,
          false,
          "User Authorization Failed (Invaled-Token)",
          null
        ),
        HttpStatus.valueOf(498)
      );
    } catch (final Exception _err) {
      return new ResponseEntity<>(
        new ServerNotesResponse(
          null,
          false,
          "Internal Server Response (500)",
          _err
        ),
        HttpStatus.valueOf(500)
      );
    }
  }

  // ** Post Note Corresponding The Current-User-Id ** //
  @PostMapping(path = "/addnote/{userId}")
  @CrossOrigin(origins = "http://localhost:5173")
  public ResponseEntity<?> addNote(
    @RequestBody Note note,
    @PathVariable String userId
  ) {
    // * Fetching User From Users Collection Through Object-Id
    final Optional<User> user = this.userRepository.findById(userId);
    Date _d = new Date();
    final Long createdAtMiliSeconds = _d.getTime();
    note.setDateInMs(createdAtMiliSeconds);

    try {
      if (user.isPresent()) {
        note.setOwner(userId);
        // * Saving Note Into Notes-Collection
        final Note savedNote = this.noteRepository.save(note);

        // * Returning Success Response From The Server
        return new ResponseEntity<>(
          new ServerNotesResponse(
            List.of(savedNote),
            true,
            "The Moment Composed Successfully!",
            null
          ),
          HttpStatus.valueOf(200)
        );
      }
      return new ResponseEntity<>(
        new ServerNotesResponse(
          null,
          false,
          "User Authorization Failed (Invaled-Token)",
          null
        ),
        HttpStatus.valueOf(498)
      );
    } catch (final Exception _err) {
      return new ResponseEntity<>(
        new ServerNotesResponse(
          null,
          false,
          "Internal Server Response (500)",
          _err
        ),
        HttpStatus.valueOf(500)
      );
    }
  }

  @PutMapping(path = "/updatenote/{userId}")
  @CrossOrigin(origins = "http://localhost:5173")
  public ResponseEntity<?> putNote(
    @RequestParam String noteId,
    @PathVariable String userId,
    @RequestBody Note note
  ) {
    // * Fetching all notes in Notes-Collection From DB
    List<Note> allNotes = this.noteRepository.findAll();
    // * Would point to the target-note that is targetted by the client by passing note-id (objectid) as {requestparam}
    Note targetNote = new Note();

    Date _d = new Date();
    final Long createdAtMiliSeconds = _d.getTime();
    try {
      for (Note eachNote : allNotes) {
        // * Filtering Note
        if (eachNote.getId().equals(noteId)) {
          targetNote = eachNote; // * Note-Found

          // * Setting Important Credentials
          note.setId(noteId);
          note.setOwner(userId);
          note.setDateInMs(createdAtMiliSeconds);
          break;
        }
      }

      // * If Description or Title is not given, leave it as it is in db, (Just To Handle Easier For Front-End-Dev)
      if (note.getDescription() == null) {
        note.setDescription(targetNote.getDescription());
      }
      if (note.getTitle() == null) {
        note.setTitle(targetNote.getTitle());
      }
      // * Updating The Note
      this.noteRepository.save(note);

      return new ResponseEntity<>(
        new ServerNotesResponse(
          List.of(note),
          true,
          "Success, Selected Current Moment Updated Successfully!",
          null
        ),
        HttpStatus.valueOf(200)
      );
    } catch (final Exception _err) {
      return new ResponseEntity<>(
        new ServerNotesResponse(
          null,
          false,
          "Error, Internal Server Error! (Something went wrong)",
          _err
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @DeleteMapping(path = "/deletenote/{userId}")
  @CrossOrigin(origins = "http://localhost:5173")
  public ResponseEntity<?> deleteNote(
    @RequestParam String noteId,
    @PathVariable String userId
  ) {
    try {
      this.noteRepository.deleteById(noteId);
      return new ResponseEntity<>(
        new ServerNotesResponse(
          null,
          true,
          "Successfully Delete The Selected Current Moment",
          null
        ),
        HttpStatus.OK
      );
    } catch (Exception _err) {
      return new ResponseEntity<>(
        new ServerNotesResponse(
          null,
          false,
          "Internal Server Error! (Something Went Wrong)",
          _err
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

class ServerNotesResponse {
  private List<Note> AllNotes;
  private Boolean success;
  private String message;
  private Exception error;

  public ServerNotesResponse(
    List<Note> AllNotes,
    Boolean success,
    String message,
    Exception error
  ) {
    this.AllNotes = AllNotes;
    this.success = success;
    this.message = message;
    this.error = error;
  }

  public Boolean getSuccess() {
    return success;
  }

  public String getMessage() {
    return message;
  }

  public List<Note> getAllNotes() {
    return AllNotes;
  }

  public Exception getError() {
    return error;
  }
}
