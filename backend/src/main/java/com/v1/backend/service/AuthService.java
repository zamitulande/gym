package com.v1.backend.service;

import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.AuthResponseDTO;
import com.v1.backend.controller.dtos.AuthenticationRequestDTO;
import com.v1.backend.controller.dtos.RegisterRequestDTO;

@Service
public interface AuthService {

    AuthResponseDTO register(RegisterRequestDTO requestDTO);

    AuthResponseDTO authenticate(AuthenticationRequestDTO requestDTO);
}
