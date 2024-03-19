package com.v1.backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.v1.backend.controller.dtos.UserDTO;
import com.v1.backend.entities.User;
import com.v1.backend.exceptions.ApiResponse;
import com.v1.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Secured("ROLE_ADMIN")
    @PostMapping("/register/users")
    public ResponseEntity<Object> createUser(@RequestBody UserDTO UserDTO) {
        User user = userService.createUser(UserDTO);
        if (user != null) {
            String message = "Usuario creado exitosamente";
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(HttpStatus.CREATED.value(), message, user));
        } else {
            String errorMessage = "Error al crear el usuario";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), errorMessage));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        if (id != null) {
            userService.deleteById(id);
            String message = "Usuario borrado exitosamente";
            return ResponseEntity.status(HttpStatus.OK)
                                  .body(new ApiResponse(HttpStatus.OK.value(), message));
        }else{
            String errorMessage = "Error al borrar el usuario";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), errorMessage));
        }      
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/dashboard")
    public ResponseEntity<Page<UserDTO>> findAll(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<UserDTO> userpage = userService.findAll(page, size);
        return ResponseEntity.ok(userpage);
    }
}
