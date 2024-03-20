package com.v1.backend.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.routine.RoutineDTO;
import com.v1.backend.entities.Routine;
import com.v1.backend.repository.RoutineRepository;
import com.v1.backend.service.RoutineService;

@Service
public class RoutineServiceImpl implements RoutineService {

    @Autowired
    private RoutineRepository routineRepository;
    
    @Override
    public Routine createRoutine(RoutineDTO routineDTO) {
        Routine routine = Routine.builder()
                .routineId(routineDTO.getRoutineId())
                .name(routineDTO.getName())
                .date(routineDTO.getDate())
                .observation(routineDTO.getObservation())
                .duration(routineDTO.getDuration())
                .exercises(null)
                .build();

         return routineRepository.save(routine);
    }
    
}
