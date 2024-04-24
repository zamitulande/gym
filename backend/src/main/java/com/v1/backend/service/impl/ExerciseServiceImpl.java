package com.v1.backend.service.impl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.v1.backend.controller.dtos.exercise.ExercisesDTO;
import com.v1.backend.entities.Exercises;
import com.v1.backend.repository.ExerciseRepository;
import com.v1.backend.service.ExercisesService;

@Service
public class ExerciseServiceImpl implements ExercisesService {

  @Autowired
  private ExerciseRepository exerciseRepository;

  @Override
  public Exercises createExercise(String name, MultipartFile document) throws IOException {

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
    return fileName;
  }

  @Override
  public List<String> findUniqueExerciseNames() {
    return exerciseRepository.findUniqueExerciseNames();
  }

  @Override
  public Page<ExercisesDTO> findAll(Pageable pageable) {

    Page<Exercises> exercisPage = exerciseRepository.findAll(pageable);

    return exercisPage
            .map(exercise -> ExercisesDTO.builder()
                          .exerciseId(exercise.getExerciseId())
                          .name(exercise.getName())
                          .documentUrl(exercise.getDocumentUrl())
                          .build());
  }

}
