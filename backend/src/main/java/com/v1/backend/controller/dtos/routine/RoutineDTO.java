package com.v1.backend.controller.dtos.routine;

import java.util.List;

import com.v1.backend.entities.Exercises;
import com.v1.backend.entities.enumerate.DayWeek;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoutineDTO {
    
    
    private Long routineId;
    private String name;
    private String date;
    private String observation;
    private String duration;

    private DayWeek dayWeek;

    private List<Exercises> exercises;
}
