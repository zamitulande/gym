package com.v1.backend.controller.dtos.exercise;


import com.v1.backend.entities.Exercises;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExercisesDTO {
    
    private Long exerciseId;
    private String name;

    private String observations;
    private String repeticiones;
    private String levantar_peso;
    private String documentUrl;

    public Exercises toEntity() {
        Exercises exercises = new Exercises();
        exercises.setName(this.name);
        exercises.setObservations(this.observations);
        exercises.setRepeticiones(this.repeticiones);
        exercises.setLevantar_peso(this.levantar_peso);
        exercises.setDocumentUrl(this.getDocumentUrl());
        return exercises;
    }
}
