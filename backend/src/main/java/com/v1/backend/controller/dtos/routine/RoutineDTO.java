package com.v1.backend.controller.dtos.routine;

import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoutineDTO {

    private Long userId;
    private String fecha;
    private String name;
    private List<String> exercises;

    private List<String> observations;
    private List<String> repeticiones;
    private List<String> levantar_peso;
    private List<String> documentUrl;
}
