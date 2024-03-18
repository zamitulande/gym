package com.v1.backend.service;

import org.springframework.data.domain.Page;

import com.v1.backend.controller.dtos.UserDTO;
import com.v1.backend.entities.User;

public interface UserService {
    User createUser(UserDTO userDTO);

    Page<UserDTO> findAll(int page, int size);
}
