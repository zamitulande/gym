package com.v1.backend.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.v1.backend.entities.Exercises;
import com.v1.backend.service.ExercisesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ExercisesController {
    
    private final ExercisesService exercisesService;

    @Secured("ROLE_ADMIN")
    @PostMapping(path = "/register/exercise", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public Exercises createExercise(@RequestParam("name") String name,
            @RequestParam("document") MultipartFile document) throws IOException {    
        
        return exercisesService.createExercise(name, document);
    }

   
    @GetMapping("/dashboard/all-exercise")
    public List<String> getAllExercises() {
        return exercisesService.findUniqueExerciseNames();
    }
}
