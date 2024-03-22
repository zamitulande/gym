package com.v1.backend.service;

import java.util.List;

import com.v1.backend.controller.dtos.exercise.ExercisesDTO;
import com.v1.backend.entities.Exercises;

public interface ExercisesService {
    
    Exercises createExercise (ExercisesDTO exercisesDTO);

    List<Exercises> findAll();
}
