package org.example.backend.services;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.UserRegister;
import org.example.backend.dto.UserResponse;
import org.example.backend.entities.User;
import org.example.backend.repositories.UsersRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UsersRepository repository;

    public UserResponse getUser(String name, String email) {
        return repository.findByNameAndEmail(name, email);
    }
    public UserResponse createUser(UserRegister user){
        UserResponse existingUser = getUser(user.name(), user.email());
        if (existingUser != null) {
            throw new IllegalStateException("User already exists");
        }
        try {
           User newUser = new User();
           newUser.setName(user.name());
           newUser.setEmail(user.email());
           newUser.setPassword(user.password());
           newUser.setPhone(user.phone());
           newUser.setRole("USER");

           User saved = repository.save(newUser);
           return new UserResponse(
                   saved.getName(),
                   saved.getEmail()
           );

        } catch (Exception e) {
            throw new IllegalStateException("User could not be created", e);
        }

    }
}
