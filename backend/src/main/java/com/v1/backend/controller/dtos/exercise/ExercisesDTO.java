package com.v1.backend.controller.dtos.exercise;

import java.util.List;

import com.v1.backend.entities.Routine;

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

    private List<Routine> routines;
}
