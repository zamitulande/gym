package com.v1.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.v1.backend.controller.dtos.UserDTO;
import com.v1.backend.entities.User;
import com.v1.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/register")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;

    @Secured("ROLE_ADMIN")
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody UserDTO UserDTO) {      
        return ResponseEntity.ok(userService.createUser(UserDTO));
    }
}
