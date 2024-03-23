package com.v1.backend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.exercise.ExercisesDTO;
import com.v1.backend.entities.Exercises;
import com.v1.backend.repository.ExerciseRepository;
import com.v1.backend.service.ExercisesService;

@Service
public class ExerciseServiceImpl implements ExercisesService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    public Exercises createExercise(ExercisesDTO exercisesDTO) {
        
        Exercises  exercises = Exercises.builder()
                    .exerciseId(exercisesDTO.getExerciseId())
                    .name(exercisesDTO.getName())
                    .build();
        
            return exerciseRepository.save(exercises);
    }

    @Override
    public List<String> findUniqueExerciseNames() {
      return exerciseRepository.findUniqueExerciseNames();
    }
    
}
