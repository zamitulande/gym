package com.v1.backend.controller.dtos.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MeasuresDTO {
    
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
