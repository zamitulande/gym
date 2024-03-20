package com.v1.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.v1.backend.controller.dtos.routine.RoutineDTO;
import com.v1.backend.entities.Routine;
import com.v1.backend.exceptions.ApiResponse;
import com.v1.backend.service.RoutineService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class RoutineController {

    private final RoutineService routineService;
    
    @Secured("ROLE_ADMIN")
    @PostMapping("/register/routine")
    public ResponseEntity<Object> createRoutine(@RequestBody RoutineDTO routineDTO) {
        Routine routine = routineService.createRoutine(routineDTO);
        if (routine != null) {
            String message = "Rutina creada exitosamente";
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(HttpStatus.CREATED.value(), message, routine));
        } else {
            String errorMessage = "Error al crear la rutina";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), errorMessage));
        }
    }
}
