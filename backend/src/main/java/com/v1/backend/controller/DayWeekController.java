package com.v1.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.v1.backend.exceptions.ApiResponse;
import com.v1.backend.service.DayWeekService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class DayWeekController {
    
    private final DayWeekService dayWeekService;
    
    @Secured("ROLE_ADMIN")
    @DeleteMapping("/delete-routine/{id}")
    public ResponseEntity<?> deteleById(@PathVariable Long id){
        if (id != null) {
            dayWeekService.deleteDayWeek(id);
            String message = "Rutina borrada exitosamente";
            return ResponseEntity.status(HttpStatus.OK)
                                  .body(new ApiResponse(HttpStatus.OK.value(), message));
        }else{
            String errorMessage = "Error al borrar la rutina";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), errorMessage));
        } 
    }
}
