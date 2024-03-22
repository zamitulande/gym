package com.v1.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.v1.backend.entities.DayWeek;

public interface DayWeekRepository extends JpaRepository<DayWeek, Long> {
    
}
