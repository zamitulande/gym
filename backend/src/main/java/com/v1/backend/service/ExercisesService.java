package com.v1.backend.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.v1.backend.entities.Exercises;

public interface ExercisesService {
    
    Exercises createExercise (String name, MultipartFile document) throws IOException;

    List<String> findUniqueExerciseNames();
}
