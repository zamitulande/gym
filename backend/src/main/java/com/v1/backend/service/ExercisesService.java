package com.v1.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.v1.backend.controller.dtos.exercise.ExercisesDTO;
import com.v1.backend.entities.Exercises;

public interface ExercisesService {
    
    Exercises createExercise (String name, MultipartFile document) throws IOException;

    List<String> findUniqueExerciseNames();

    Page<ExercisesDTO> findAll(Pageable pageable);
}
