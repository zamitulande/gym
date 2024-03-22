package com.v1.backend.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "dayweek")
public class DayWeek {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dayId;
    private String fecha;


    @OneToMany
    @JoinColumn(
        name = "day_id",
        referencedColumnName = "dayId"
    )
    private List<Routine> rutinas;
}
