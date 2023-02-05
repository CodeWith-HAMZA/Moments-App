package dev.todoapp.todoapp.Models;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "iUsers")
public class User {
  private String id;
  private String userName;
  private String email;
  private String password;
  private String profileUrl;

  public User() {}

  public User(
    String id,
    String userName,
    String email,
    String password,
    String profileUrl
  ) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.profileUrl = profileUrl;
    this.password = password;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUserName() {
    return userName;
  }

  public String getEmail() {
    return email;
  }

  public String getPassword() {
    return password;
  }

  public String getProfileUrl() {
    return profileUrl;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public void setProfileUrl(String profileUrl) {
    this.profileUrl = profileUrl;
  }
}
