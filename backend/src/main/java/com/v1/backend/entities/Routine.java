package com.v1.backend.entities;

import java.util.List;

import org.hibernate.annotations.ManyToAny;

import com.v1.backend.entities.enumerate.DayWeek;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Routine {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routineId;
    private String name;
    private String date;
    private String observation;
    private String duration;
    //observacion
    //duracion rutina

    @Enumerated(EnumType.ORDINAL)
    private DayWeek dayWeek;

    @ManyToAny
    private List<SportsMan> sportsMans;

    @ManyToAny
    @JoinTable(
    name = "routine_exercise",
    joinColumns = @JoinColumn(name = "routine_id"),
    inverseJoinColumns = @JoinColumn(name = "exericise_id"))
    private List<Exercises> exercises;
}
