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
public class Measures {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long measureId;

    private String hombros;
    private String cadera;
    private String pantorrilla;
    private String pecho;
    private String pierna_a;
    private String pierna_m;
    private String pierna_b;
    private String brazo;
    private String cintura;
    private String antebrazo;
    private String masa_corporal;

 
}
