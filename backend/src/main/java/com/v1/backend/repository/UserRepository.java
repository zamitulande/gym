package com.v1.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.v1.backend.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByIdentification(String identification);
}
