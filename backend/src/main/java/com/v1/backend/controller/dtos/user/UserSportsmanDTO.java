package com.v1.backend.controller.dtos.user;



import java.util.List;

import com.v1.backend.entities.enumerate.Role;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSportsmanDTO {

    private Long userId;

    private String name;

    private String lastname;

    private String identification;

    private Role role;

    private String level;

    private String age;

    private String weight;

    private String size;

    private String start;

    private String end;

    private String medical_history;
    
    private String profession;

    private List<MeasuresDTO> measures;
    
    private String documentUrl;
}
