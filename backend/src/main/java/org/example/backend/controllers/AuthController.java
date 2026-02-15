package org.example.backend.controllers;

import org.example.backend.dto.UserResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @GetMapping("/check")
    public ResponseEntity<UserResponse> checkAuth(@AuthenticationPrincipal OAuth2User resUser) {
        if (resUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(
                new UserResponse(
                        resUser.getAttributes().get("login").toString(),
                        null
                ));
    }

}
