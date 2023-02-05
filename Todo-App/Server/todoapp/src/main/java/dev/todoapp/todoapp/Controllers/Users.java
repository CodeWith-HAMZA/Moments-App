package dev.todoapp.todoapp.Controllers;

import dev.todoapp.todoapp.Models.User;
import dev.todoapp.todoapp.Repository.UserRepository;
import jakarta.security.auth.message.ServerAuth;
import java.lang.StackWalker.Option;
import java.util.List;
import java.util.Optional;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.function.ServerResponse;

// * Anotation for The "Current-Class", To Be Used As Rest-Controller For [User-Specific-Routes]
@RestController
public class Users {
  @Autowired
  private UserRepository userRepo; // * the repo is providing all the methods or queries related to

  // "Users-Collection" In DB

  // ***** Post-User Endpoint Through Data, Provided By Client As "RequestBody"
  // ***** //
  @PostMapping(path = "/register")
  @CrossOrigin(origins = "http://localhost:5173")
  public ResponseEntity<ServerAuthResponse> postUser(@RequestBody User user) {
    // System.out.println(
    // this.userRepo.findUserByEmail(user.getEmail()) + "ERRRRRRRRRRRRRRRRR"
    // );

    try {
      if (this.userRepo.findUserByEmail(user.getEmail()).isPresent()) {
        // * Preparing SUc-Res
        final ServerAuthResponse errRes = new ServerAuthResponse(
          false,
          "Error, Account Already Exists With This Email",
          "",
          null
        );
        return new ResponseEntity<ServerAuthResponse>(
          errRes,
          HttpStatus.NOT_ACCEPTABLE
        );
      }
      // * saving into db
      user = this.userRepo.save(user);

      // * Preparing Suc-Res
      final ServerAuthResponse sucRes = new ServerAuthResponse(
        true,
        "Success, You Are Registered Successfully!",
        user.getId(), // * Mimiking Of (Authorization)
        null
      );

      // * Returning Success-Response
      return new ResponseEntity<ServerAuthResponse>(sucRes, HttpStatus.OK);
    } catch (Exception e) {
      System.out.println(e);
      return new ResponseEntity<ServerAuthResponse>(
        new ServerAuthResponse(
          false,
          "Internal Server Error (Problem From Server-Side)",
          "",
          null
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // ***** Login-User Endpoint Through JSON-DATA, Provided By Client As
  // "RequestBody" ***** //
  @PostMapping(path = "/signin")
  @CrossOrigin(origins = "http://localhost:5173")
  public ResponseEntity<ServerAuthResponse> signinUser(@RequestBody User user) {
    // System.out.println(
    // this.userRepo.findUserByEmail(user.getEmail()) + "ERRRRRRRRRRRRRRRRR"
    // );

    try {
      // * User must have account in db to proceed further
      if (!(this.userRepo.findUserByEmail(user.getEmail()).isPresent())) {
        // * Preparing Err-Res
        final ServerAuthResponse errRes = new ServerAuthResponse(
          false,
          "Error, Account Doesn't Exist With This Email",
          "",
          null
        );
        return new ResponseEntity<ServerAuthResponse>(
          errRes,
          HttpStatus.NOT_ACCEPTABLE
        );
      }

      List<User> allUsers = this.userRepo.findAll();

      User targetUser = new User(); // * Void-Constructor

      // * Filtering The Target-Doc Through The Provided-Email-Id From The Client
      for (User eachUser : allUsers) {
        if (eachUser.getEmail().equals(user.getEmail())) {
          // * Found The Targeted User From The DB Through The Provided Email
          targetUser = eachUser;
        }
      }

      final String uIdAuthToken = targetUser.getId();

      // * Handling Provided-Credentials With DB
      if (targetUser.getPassword().equals(user.getPassword())) {
        // * Preparing Suc-Res
        final ServerAuthResponse sucRes = new ServerAuthResponse(
          true,
          "Success, You Are Loggedin Successfully!",
          uIdAuthToken, // * Mimiking The User-Id As (Auth-Token) JWT
          null
        );

        // * Returning Success-Response
        return new ResponseEntity<ServerAuthResponse>(sucRes, HttpStatus.OK);
      }
      final ServerAuthResponse errRes = new ServerAuthResponse(
        false,
        "Error, Authentication Failed! (Invalid Credentials)",
        "", // * Mimiking Of (Authorization)
        null
      );

      // * Returning Success-Response
      return new ResponseEntity<ServerAuthResponse>(errRes, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(
        new ServerAuthResponse(
          false,
          "Internal Server Error (Some-Problem-From-Server-Side)",
          "",
          null
        ),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @GetMapping(path = "/fetchuser/{userId}")
  @CrossOrigin(origins = "http://localhost:5173")
  public ResponseEntity<ServerAuthResponse> fetchUser(
    @PathVariable String userId
  ) {
    try {
      final Optional<User> user = this.userRepo.findById(userId);
      if (user.isPresent()) {
        return new ResponseEntity<ServerAuthResponse>(
          new ServerAuthResponse(
            true,
            "Successfully Fetched The User",
            "",
            user
          ),
          HttpStatus.OK
        );
      }
      return new ResponseEntity<ServerAuthResponse>(
        new ServerAuthResponse(
          false,
          "Error, No User Is Found corresponding The Current Token(id)",
          "",
          null
        ),
        HttpStatus.OK
      );
    } catch (Exception _err) {
      return new ResponseEntity<ServerAuthResponse>(
        new ServerAuthResponse(false, "Internal Server Error", "", null),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}

/**
 * InnerUsers
 */
class ServerAuthResponse {
  private Boolean success;
  private String message;
  private String authToken;
  private Optional<User> currentUser;

  public ServerAuthResponse(
    Boolean success,
    String message,
    String authToken,
    Optional<User> currentUser
  ) {
    this.success = success;
    this.message = message;
    this.authToken = authToken;
    this.currentUser = currentUser;
  }

  public void setSuccess(Boolean success) {
    this.success = success;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public void setAuthToken(String authToken) {
    this.authToken = authToken;
  }

  public void setCurrentUser(Optional<User> currentUser) {
    this.currentUser = currentUser;
  }

  public String getAuthToken() {
    return authToken;
  }

  public Boolean getSuccess() {
    return success;
  }

  public String getMessage() {
    return message;
  }

  public Optional<User> getCurrentUser() {
    return currentUser;
  }
}
