package com.v1.backend.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v1.backend.repository.DayWeekRepository;
import com.v1.backend.service.DayWeekService;

@Service
public class DayWeekSeriveImpl implements DayWeekService {
    
    @Autowired DayWeekRepository dayWeekRepository;

    @Override
    public void deleteDayWeek(Long id) {
        dayWeekRepository.deleteById(id);
    } 
}
