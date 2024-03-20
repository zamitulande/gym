package com.v1.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.v1.backend.controller.dtos.exercise.ExercisesDTO;
import com.v1.backend.entities.Exercises;
import com.v1.backend.exceptions.ApiResponse;
import com.v1.backend.service.ExercisesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ExercisesController {
    
    private final ExercisesService exercisesService;

    @Secured("ROLE_ADMIN")
    @PostMapping("/register/exercise")
    public ResponseEntity<Object> createExercise(@RequestBody ExercisesDTO exercisesDTO) {
        Exercises exercises = exercisesService.createExercise(exercisesDTO);
        if (exercises != null) {
            String message = "Ejercicio creado exitosamente";
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(HttpStatus.CREATED.value(), message, exercises));
        } else {
            String errorMessage = "Error al crear el ejercicio";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), errorMessage));
        }
    }
}
