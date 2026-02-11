package org.example.backend.controllers;


import lombok.RequiredArgsConstructor;
import org.example.backend.dto.UserRegister;
import org.example.backend.dto.UserResponse;
import org.example.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    //GET /api/user?name=John&email=john@mail.com
    @GetMapping("/login")
    public UserResponse getUser(
            @RequestParam String name,
            @RequestParam String email
    ){
        return service.getUser(name, email);
    }

    @GetMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@RequestBody UserRegister user){
        return service.createUser(user);
    }

}
