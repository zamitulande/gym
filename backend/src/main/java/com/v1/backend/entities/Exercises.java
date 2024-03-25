package com.v1.backend.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Exercises {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exerciseId;
    private String name;
    private String observations;
    private String repeticiones;
    private String levantar_peso;

    private String documentUrl;
}
