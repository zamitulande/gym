package com.v1.backend.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.v1.backend.controller.dtos.routine.RoutineDTO;
import com.v1.backend.entities.Routine;
import com.v1.backend.service.RoutineService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class RoutineController {

    private final RoutineService routineService;
    
    @Secured("ROLE_ADMIN")
    @PostMapping("/usuarios/{userId}/rutina")
    public ResponseEntity<?> asignarRutina(@PathVariable Long userId,
                                           @RequestBody RoutineDTO routineDTO) {
                   
        Routine createdRoutine = routineService.createRoutine(userId, routineDTO);
        return ResponseEntity.ok(createdRoutine);
    }
}
