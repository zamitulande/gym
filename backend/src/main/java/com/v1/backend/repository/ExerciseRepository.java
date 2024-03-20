package com.v1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.v1.backend.entities.Exercises;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercises, Long>{
    
}
