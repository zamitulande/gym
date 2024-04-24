package com.v1.backend.controller.dtos.exercise;


import java.util.List;

import com.v1.backend.entities.Exercises;
import com.v1.backend.entities.Items;

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
    private String documentUrl;

    private List<Items> items;

    public Exercises toEntity() {
        Exercises exercises = new Exercises();
        exercises.setName(this.name);
        exercises.setDocumentUrl(this.getDocumentUrl());
        exercises.setItems(this.getItems());
        return exercises;
    }
}
