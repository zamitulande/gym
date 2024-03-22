package com.v1.backend.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.user.UserDTO;
import com.v1.backend.controller.dtos.user.UserSportsmanDTO;
import com.v1.backend.entities.SportsMan;
import com.v1.backend.entities.User;
import com.v1.backend.entities.enumerate.Role;
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
                .userId(userDTO.getUserId())
                .name(userDTO.getName())
                .lastname(userDTO.getLastname())
                .identification(userDTO.getIdentification())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .role(Role.COACH)
                .build();
        return userRepository.save(user);
    }

    @Override
    public Page<UserDTO> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findByRole(Role.COACH, pageable);

        return userPage
                .map(user -> UserDTO.builder()
                        .userId(user.getUserId())
                        .identification(user.getIdentification())
                        .name(user.getName())
                        .lastname(user.getLastname())
                        .role(Role.COACH)
                        .build());
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User createUserSportsman(UserSportsmanDTO sportsmanDTO) {
        User user = new SportsMan();
        user.setUserId(sportsmanDTO.getUserId());
        user.setName(sportsmanDTO.getName());
        user.setLastname(sportsmanDTO.getLastname());
        user.setIdentification(sportsmanDTO.getIdentification());
        user.setRole(Role.SPORTSMAN);

        ((SportsMan) user).setLevel(sportsmanDTO.getLevel());
        ((SportsMan) user).setAge(sportsmanDTO.getAge());
        ((SportsMan) user).setWeight(sportsmanDTO.getWeight());
        ((SportsMan) user).setSize(sportsmanDTO.getSize());
        ((SportsMan) user).setMedical_history(sportsmanDTO.getMedical_history());
        ((SportsMan) user).setProfession(sportsmanDTO.getProfession());

        return userRepository.save(user);
    }

    @Override
    public Page<UserSportsmanDTO> findAllSportsman(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findByRole(Role.SPORTSMAN, pageable);

        return userPage
                .map(user -> UserSportsmanDTO.builder()
                        .userId(user.getUserId())
                        .identification(user.getIdentification())
                        .name(user.getName())
                        .lastname(user.getLastname())
                        .level(((SportsMan) user).getLevel())
                        .age(((SportsMan) user).getAge())
                        .weight(((SportsMan) user).getWeight())
                        .size(((SportsMan) user).getSize())
                        .medical_history(((SportsMan) user).getMedical_history())
                        .profession(((SportsMan) user).getProfession())
                        .role(Role.SPORTSMAN)
                        .build());
    }

}
