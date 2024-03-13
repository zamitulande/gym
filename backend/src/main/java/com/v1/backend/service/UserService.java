package com.v1.backend.service;

import com.v1.backend.controller.dtos.UserDTO;
import com.v1.backend.entities.User;

public interface UserService {
    User createUser(UserDTO userDTO);
}
