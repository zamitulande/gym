package com.v1.backend.controller.dtos.exercise;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemsDTO {
    
    private Long id;
    private String observation;
    private String repeticiones;
    private String levantarPeso;
}
