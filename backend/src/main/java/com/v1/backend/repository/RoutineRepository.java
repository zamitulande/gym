package com.v1.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.v1.backend.entities.Routine;

@Repository
public interface RoutineRepository extends JpaRepository<Routine, Long>{

    List<Routine> findByName(String identification);
} 
