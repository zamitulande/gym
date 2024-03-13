package com.v1.backend.service;

import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.AuthResponseDTO;
import com.v1.backend.controller.dtos.AuthenticationRequestDTO;

@Service
public interface AuthService {


    AuthResponseDTO authenticate(AuthenticationRequestDTO requestDTO);
}
