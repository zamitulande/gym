package com.v1.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.exercise.ExercisesDTO;
import com.v1.backend.controller.dtos.routine.RoutineDTO;
import com.v1.backend.entities.DayWeek;
import com.v1.backend.entities.Exercises;
import com.v1.backend.entities.Routine;
import com.v1.backend.entities.User;
import com.v1.backend.repository.DayWeekRepository;
import com.v1.backend.repository.ExerciseRepository;
import com.v1.backend.repository.RoutineRepository;
import com.v1.backend.repository.UserRepository;
import com.v1.backend.service.RoutineService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RoutineServiceImpl implements RoutineService {

    @Autowired
    private RoutineRepository routineRepository;

    @Autowired
    private ExerciseRepository exercisesRepository;

    @Autowired
    private DayWeekRepository dayWeekRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Routine createRoutine(Long userId, RoutineDTO routineDTO) {
        // Buscar al usuario por su ID
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        // Crear la fecha de la rutina
        DayWeek dayWeek = new DayWeek();
        dayWeek.setFecha(routineDTO.getFecha());
        dayWeekRepository.save(dayWeek);

        // Crear la rutina asociada a la fecha
        Routine routine = new Routine();
        routine.setName(routineDTO.getName());
        routineRepository.save(routine);

        // Asignar la rutina a la fecha
        List<Routine> rutinas = new ArrayList<>();
        rutinas.add(routine);
        dayWeek.setRutinas(rutinas);
        dayWeekRepository.save(dayWeek);

        // Crear y asignar los ejercicios a la rutina
        List<Exercises> exercisesList = new ArrayList<>();
        for (int i = 0; i < routineDTO.getExercises().size(); i++) {
            ExercisesDTO exercisesDTO = new ExercisesDTO();
            exercisesDTO.setName(routineDTO.getExercises().get(i));
            exercisesDTO.setObservations(routineDTO.getObservations().get(i));
            exercisesDTO.setRepeticiones(routineDTO.getRepeticiones().get(i));
            exercisesDTO.setLevantar_peso(routineDTO.getLevantar_peso().get(i));
            Exercises exercises = exercisesDTO.toEntity();
            exercisesRepository.save(exercises);
            exercisesList.add(exercises);
        }
        routine.setExercises(exercisesList);
        routineRepository.save(routine);

        // Asignar la fecha de la rutina al usuario
        List<DayWeek> dayWeeks = user.getDayWeek();
        if (dayWeeks == null) {
            dayWeeks = new ArrayList<>();
        }
        dayWeeks.add(dayWeek);
        user.setDayWeek(dayWeeks);
        userRepository.save(user);

        return routine;
    }

}
