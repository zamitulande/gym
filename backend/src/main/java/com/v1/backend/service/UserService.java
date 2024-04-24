package com.v1.backend.service;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.v1.backend.controller.dtos.user.UserDTO;
import com.v1.backend.controller.dtos.user.UserSportsmanDTO;
import com.v1.backend.entities.DayWeek;
import com.v1.backend.entities.User;

public interface UserService {

    User createUser(UserDTO userDTO);

    Page<UserDTO> findAll(int page, int size);

    User createUserSportsman(String name, String lastname, String identification, String level, String age, String weight, String size, String start,String end, String medical_history,String profession, MultipartFile document, String hombros, String cadera,String pantorrilla, String pecho, String pierna_a, String pierna_b,String  pierna_m,String brazo,
    String cintura,String antebrazo,String masa_corporal) throws IOException;

    void deleteById(Long id);

    Page<UserSportsmanDTO> findAllSportsman(int page, int size);

    Page<DayWeek> findRoutineByUser(String identification, Pageable pageable);
}
