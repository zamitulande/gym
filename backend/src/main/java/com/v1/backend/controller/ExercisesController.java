package com.v1.backend.controller;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.v1.backend.entities.Exercises;
import com.v1.backend.repository.ExerciseRepository;
import com.v1.backend.service.ExercisesService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class ExercisesController {
    
    @Autowired
    private ExerciseRepository exerciseRepository;

    private final ExercisesService exercisesService;

    @Secured("ROLE_ADMIN")
    @PostMapping(path = "/register/exercise", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public Exercises createExercise(@RequestParam("name") String name,
            @RequestParam("document") MultipartFile document) throws IOException {
        String documentUrl = saveUploadedFile(document);
        Exercises exercises = Exercises.builder()
                .name(name)
                .documentUrl(documentUrl) // Guardar la URL del documento en lugar del objeto MultipartFile
                .build();
      
        return exerciseRepository.save(exercises);
    }

    private String saveUploadedFile(MultipartFile file) throws IOException {

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        String uploadDir = "./backend/src/main/resources/static/images/exercises";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        try (OutputStream os = new FileOutputStream(filePath.toFile())) {
            os.write(file.getBytes());
        }
        return filePath.toString();
    }

    @GetMapping("/dashboard/all-exercise")
    public List<String> getAllExercises() {
        return exercisesService.findUniqueExerciseNames();
    }
}
