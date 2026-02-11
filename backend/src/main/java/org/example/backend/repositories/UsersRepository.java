package org.example.backend.repositories;

import org.example.backend.dto.UserResponse;
import org.example.backend.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends MongoRepository<User, String> {

    UserResponse findByNameAndEmail(String name, String email);
}
