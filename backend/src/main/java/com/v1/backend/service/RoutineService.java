package com.v1.backend.service;

import com.v1.backend.controller.dtos.routine.RoutineDTO;
import com.v1.backend.entities.Routine;

public interface RoutineService {
    
    Routine createRoutine(Long userId, RoutineDTO routineDTO);
}
