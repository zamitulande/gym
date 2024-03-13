package com.v1.backend.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.UserDTO;
import com.v1.backend.entities.User;
import com.v1.backend.repository.UserRepository;
import com.v1.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public User createUser(UserDTO userDTO) {
        User user = User.builder()
                        .name(userDTO.getName())
                        .lastname(userDTO.getLastname())
                        .identification(userDTO.getIdentification())
                        .password(passwordEncoder.encode(userDTO.getPassword()))
                        .role(userDTO.getRole())
                        .build();
        return userRepository.save(user);
    }
}
