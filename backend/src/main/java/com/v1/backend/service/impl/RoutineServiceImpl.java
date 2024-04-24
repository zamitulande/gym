package com.v1.backend.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.v1.backend.controller.dtos.routine.RoutineDTO;
import com.v1.backend.entities.DayWeek;
import com.v1.backend.entities.Exercises;
import com.v1.backend.entities.Items;
import com.v1.backend.entities.Routine;
import com.v1.backend.entities.User;
import com.v1.backend.repository.DayWeekRepository;
import com.v1.backend.repository.ExerciseRepository;
import com.v1.backend.repository.ItemRepository;
import com.v1.backend.repository.RoutineRepository;
import com.v1.backend.repository.UserRepository;
import com.v1.backend.service.RoutineService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RoutineServiceImpl implements RoutineService {

    @Autowired
    private RoutineRepository routineRepository;

    @Autowired
    private DayWeekRepository dayWeekRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ItemRepository itemRepository;

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
        dayWeek.setRoutines(rutinas);
        dayWeekRepository.save(dayWeek);

        // Buscar el ejercicio por su nombre en la base de datos
        List<Exercises> exercisesList = new ArrayList<>();
        for (String exerciseName : routineDTO.getExercises()) {
            List<Exercises> existingExercises = exerciseRepository.findByName(exerciseName);
            if (existingExercises.isEmpty()) {
                throw new EntityNotFoundException("No se encontraron ejercicios con el nombre: " + exerciseName);
            }
            Exercises existingExercise = existingExercises.get(0); // Tomar solo el primer ejercicio encontrado
    
            // Crear una copia del ejercicio existente con un nuevo exerciseId
            Exercises copiedExercise = new Exercises();
            copiedExercise.setName(existingExercise.getName());
            copiedExercise.setDocumentUrl(existingExercise.getDocumentUrl()); // Puedes establecer el URL según tus necesidades
            exerciseRepository.save(copiedExercise);
        
            // Agregar la copia del ejercicio a la lista de ejercicios de la rutina
            exercisesList.add(copiedExercise);
        }

        routine.setExercises(exercisesList);

        // Crear y asignar los ejercicios a la rutina
        for (int i = 0; i < routineDTO.getExercises().size(); i++) {
            Exercises exercise = exercisesList.get(i);

            Items item = new Items();
            item.setObservation(routineDTO.getObservations().get(i));
            item.setRepeticiones(routineDTO.getRepeticiones().get(i));
            item.setLevantarPeso(routineDTO.getLevantar_peso().get(i));

            // Guardar el item en la base de datos utilizando ItemRepository
            itemRepository.save(item);

            exercise.getItems().add(item);

        }
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
