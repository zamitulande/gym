package com.v1.backend.controller.dtos.user;

import java.util.List;

import com.v1.backend.entities.DayWeek;
import com.v1.backend.entities.enumerate.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private Long userId;
    
    private String name; 

    private String lastname;

    private String identification;

    private String password;

    private Role role;

    private List<DayWeek> dayWeek;
}
