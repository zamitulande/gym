package com.v1.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.v1.backend.entities.Exercises;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercises, Long>{
    
    @Query("SELECT DISTINCT e.name FROM Exercises e")
    List<String> findUniqueExerciseNames();

    List<Exercises> findByName(String name);
}
