package com.v1.backend.service.impl;

import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.user.AuthResponseDTO;
import com.v1.backend.controller.dtos.user.AuthenticationRequestDTO;
import com.v1.backend.entities.User;
import com.v1.backend.repository.UserRepository;
import com.v1.backend.service.AuthService;
import com.v1.backend.service.JwtService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthResponseDTO authenticate(AuthenticationRequestDTO requestDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDTO.getIdentification(),
                        requestDTO.getPassword()));
        User userDetails = (User) authentication.getPrincipal();
        String roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(""));
        // traer la identification de la base de datos
        var user = userRepository.findByIdentification(requestDTO.getIdentification()).orElseThrow();
        var jwrToken = jwtService.generateToken(user);
        AuthResponseDTO responseDTO = AuthResponseDTO.builder()
                .token(jwrToken)
                .role(roles) // Agregar los roles al DTO
                .build();
        return responseDTO;
    }

}
