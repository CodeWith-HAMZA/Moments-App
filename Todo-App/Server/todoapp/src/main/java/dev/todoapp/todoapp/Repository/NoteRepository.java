package dev.todoapp.todoapp.Repository;

import dev.todoapp.todoapp.Models.Note;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

// * This Will Help To Apply Queries Related To Notes Collection In NOTES-Database
public interface NoteRepository extends MongoRepository<Note, String> {}
