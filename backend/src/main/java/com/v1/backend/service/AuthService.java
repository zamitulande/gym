package com.v1.backend.service;

import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.user.AuthResponseDTO;
import com.v1.backend.controller.dtos.user.AuthenticationRequestDTO;

@Service
public interface AuthService {


    AuthResponseDTO authenticate(AuthenticationRequestDTO requestDTO);
}
