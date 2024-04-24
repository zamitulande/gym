package com.v1.backend.service.impl;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.v1.backend.controller.dtos.user.MeasuresDTO;
import com.v1.backend.controller.dtos.user.UserDTO;
import com.v1.backend.controller.dtos.user.UserSportsmanDTO;
import com.v1.backend.entities.DayWeek;
import com.v1.backend.entities.Measures;
import com.v1.backend.entities.SportsMan;
import com.v1.backend.entities.User;
import com.v1.backend.entities.enumerate.Role;
import com.v1.backend.repository.MeasuresRepository;
import com.v1.backend.repository.UserRepository;
import com.v1.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final MeasuresRepository measuresRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
            MeasuresRepository measuresRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.measuresRepository = measuresRepository;
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
    public User createUserSportsman(String name, String lastname, String identification,
            String level, String age, String weight, String size, String start, String end,
            String medical_history, String profession, MultipartFile document, String hombros,
            String cadera, String pantorrilla, String pecho, String pierna_a, String pierna_b,
            String pierna_m, String brazo,
            String cintura, String antebrazo, String masa_corporal) throws IOException {

        String documentUrl = saveUploadedFile(document);

        User user = new SportsMan();
        user.setName(name);
        user.setLastname(lastname);
        user.setIdentification(identification);
        user.setRole(Role.SPORTSMAN);

        ((SportsMan) user).setLevel(level);
        ((SportsMan) user).setAge(age);
        ((SportsMan) user).setWeight(weight);
        ((SportsMan) user).setSize(size);
        ((SportsMan) user).setMedical_history(medical_history);
        ((SportsMan) user).setProfession(profession);
        ((SportsMan) user).setDocumentUrl(documentUrl);

        List<Measures> measuresList = new ArrayList<>();
        Measures measures = new Measures();
        measures.setHombros(hombros);
        measures.setCadera(cadera);
        measures.setPantorrilla(pantorrilla);
        measures.setPecho(pecho);
        measures.setPierna_a(pierna_a);
        measures.setPierna_b(pierna_b);
        measures.setPierna_m(pierna_m);
        measures.setBrazo(brazo);
        measures.setAntebrazo(antebrazo);
        measures.setCintura(cintura);
        measures.setMasa_corporal(masa_corporal);

        measuresRepository.save(measures);
        measuresList.add(measures);
        user.setMeasures(measuresList);
        return userRepository.save(user);
    }

    private String saveUploadedFile(MultipartFile file) throws IOException {

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        String uploadDir = "./backend/src/main/resources/static/images/sportsman";
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        Path filePath = uploadPath.resolve(fileName);
        try (OutputStream os = new FileOutputStream(filePath.toFile())) {
            os.write(file.getBytes());
        }
        return fileName;
    }

    @Override
    public Page<UserSportsmanDTO> findAllSportsman(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<User> userPage = userRepository.findByRole(Role.SPORTSMAN, pageable);

        return userPage.map(user -> {


            // Convertir medidas (Measures) a medidas DTO (MeasuresDTO)
            List<MeasuresDTO> measuresDTOList = user.getMeasures().stream()
                    .map(measures -> MeasuresDTO.builder()
                            .hombros(measures.getHombros())
                            .cadera(measures.getCadera())
                            .pantorrilla(measures.getPantorrilla())
                            .pecho(measures.getPecho())
                            .pierna_a(measures.getPierna_a())
                            .pierna_m(measures.getPierna_m())
                            .pierna_b(measures.getPierna_b())
                            .brazo(measures.getBrazo())
                            .cintura(measures.getCintura())
                            .antebrazo(measures.getAntebrazo())
                            .masa_corporal(measures.getMasa_corporal())
                            .build())
                    .collect(Collectors.toList());

            UserSportsmanDTO userSportsmanDTO = UserSportsmanDTO.builder()
                    .userId(user.getUserId())
                    .identification(user.getIdentification())
                    .name(user.getName())
                    .lastname(user.getLastname())
                    .role(Role.SPORTSMAN)
                    .level(((SportsMan) user).getLevel())
                    .age(((SportsMan) user).getAge())
                    .weight(((SportsMan) user).getWeight())
                    .size(((SportsMan) user).getSize())
                    .medical_history(((SportsMan) user).getMedical_history())
                    .profession(((SportsMan) user).getProfession())
                    .documentUrl(user.getDocumentUrl())
                    .measures(measuresDTOList)
                    .build();


            return userSportsmanDTO;
        }
        
       );
    }

    @Override
    public Page<DayWeek> findRoutineByUser(String identification, Pageable pageable) {

        Optional<User> user = userRepository.findByIdentification(identification);
        if (user != null) {
            return userRepository.findUserRoutine(identification, pageable);

        }
        return null;
    }

}
