package com.v1.backend.service;

import com.v1.backend.controller.dtos.exercise.ExercisesDTO;
import com.v1.backend.entities.Exercises;

public interface ExercisesService {
    
    Exercises createExercise (ExercisesDTO exercisesDTO);
}
