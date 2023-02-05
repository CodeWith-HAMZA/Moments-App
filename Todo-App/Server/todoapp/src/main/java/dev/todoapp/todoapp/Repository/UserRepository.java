package dev.todoapp.todoapp.Repository;

import dev.todoapp.todoapp.Models.User;
import java.util.Optional;
import javax.print.DocFlavor.STRING;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
  Optional<User> findUserByEmail(String email);
}
