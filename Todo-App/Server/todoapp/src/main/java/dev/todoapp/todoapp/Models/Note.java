package dev.todoapp.todoapp.Models;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Notes")
public class Note {
  private String id;
  private String owner;
  private String title;
  private String description;
  private List<String> tags;
  private List<String> categories;
  private Long dateInMs;

  public Note() {}

  public Note(
    String id,
    String owner,
    String title,
    String description,
    List<String> tags,
    List<String> categories,
    Long dateInMs
  ) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.categories = categories;
    this.dateInMs = dateInMs;
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public List<String> getTags() {
    return tags;
  }

  public String getDescription() {
    return description;
  }

  public List<String> getCategories() {
    return categories;
  }

  public String getOwner() {
    return owner;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Long getDateInMs() {
    return dateInMs;
  }

  public void setDateInMs(Long dateInMs) {
    this.dateInMs = dateInMs;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setCategories(List<String> categories) {
    this.categories = categories;
  }

  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setOwner(String owner) {
    this.owner = owner;
  }
}
