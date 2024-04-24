package com.v1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.v1.backend.entities.Measures;

public interface MeasuresRepository  extends JpaRepository<Measures, Long>{
    
}
