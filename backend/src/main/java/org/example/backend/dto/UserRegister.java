package org.example.backend.dto;

public record UserRegister(
         String name,
         String email,
         String password,
         String phone
) {
}
