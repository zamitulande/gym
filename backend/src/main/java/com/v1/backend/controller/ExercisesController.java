package com.v1.backend.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.v1.backend.controller.dtos.exercise.ExercisesDTO;
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

    private static final String EXERCISE_IMAGE_DIRECTORY = "./backend/src/main/resources/static/images/exercises/";

    @GetMapping("/image/{imageNames}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageNames) throws IOException {
        System.out.println(imageNames);
        try {
            Path imagePath = Paths.get(EXERCISE_IMAGE_DIRECTORY + imageNames);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // Determinar el tipo de contenido basado en la extensión del archivo
                MediaType contentType = determineContentType(imageNames);
                return ResponseEntity.ok()
                        .contentType(contentType)
                        .body(resource);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (MalformedURLException e) {
            // Manejar la excepción de URL mal formada
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private MediaType determineContentType(String imageName) {
        String[] parts = imageName.split("\\.");
        String extension = parts[parts.length - 1];
        return MediaType.parseMediaType("image/" + extension.toLowerCase());
    }

    @GetMapping("/dashboard/exercise")
    public ResponseEntity<Page<ExercisesDTO>> findAll(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<ExercisesDTO> userpage = exercisesService.findAll(pageable);
        return ResponseEntity.ok(userpage);
    }
}
