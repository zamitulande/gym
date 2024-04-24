package com.v1.backend.controller;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.v1.backend.controller.dtos.user.UserDTO;
import com.v1.backend.controller.dtos.user.UserSportsmanDTO;
import com.v1.backend.entities.DayWeek;
import com.v1.backend.entities.User;
import com.v1.backend.exceptions.ApiResponse;
import com.v1.backend.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Secured("ROLE_ADMIN")
    @PostMapping("/register/user-coach")
    public ResponseEntity<Object> createUser(@RequestBody UserDTO UserDTO) {
        User user = userService.createUser(UserDTO);
        if (user != null) {
            String message = "Usuario creado exitosamente";
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(HttpStatus.CREATED.value(), message, user));
        } else {
            String errorMessage = "Error al crear el usuario";
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), errorMessage));
        }
    }

    @Secured("ROLE_ADMIN")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        if (id != null) {
            userService.deleteById(id);
            String message = "Usuario borrado exitosamente";
            return ResponseEntity.status(HttpStatus.OK)
                                  .body(new ApiResponse(HttpStatus.OK.value(), message));
        }else{
            String errorMessage = "Error al borrar el usuario";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                                 .body(new ApiResponse(HttpStatus.BAD_REQUEST.value(), errorMessage));
        }      
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/dashboard/coach")
    public ResponseEntity<Page<UserDTO>> findAllCoach(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<UserDTO> userpage = userService.findAll(page, size);
        return ResponseEntity.ok(userpage);
    }

    @PostMapping(path = "/register/user-sportsman", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public User createUserSportsman(@RequestParam String name,
                                                    @RequestParam String lastname,
                                                    @RequestParam String identification,
                                                    @RequestParam String level,
                                                    @RequestParam String age,
                                                    @RequestParam String weight,
                                                    @RequestParam String size,
                                                    @RequestParam(required = false) String start,
                                                    @RequestParam(required = false) String end,
                                                    @RequestParam(required = false) String medical_history,
                                                    @RequestParam(required = false) String profession,
                                                    @RequestParam("document") MultipartFile document,
                                                    @RequestParam String hombros,
                                                    @RequestParam String cadera,
                                                    @RequestParam String pantorrilla,
                                                    @RequestParam String pecho,
                                                    @RequestParam String pierna_a,
                                                    @RequestParam String pierna_m,
                                                    @RequestParam String pierna_b,
                                                    @RequestParam String brazo,
                                                    @RequestParam String cintura,
                                                    @RequestParam String antebrazo,
                                                    @RequestParam String masa_corporal) throws IOException {
                    
                return userService.createUserSportsman(name, lastname, identification, 
                                                        level, age, weight, size,start, end, 
                                                        medical_history, profession,document,
                                                        hombros, cadera, pantorrilla, pecho,pierna_a, pierna_b, pierna_m, brazo,
                                                        cintura, antebrazo, masa_corporal);
       
    }

    @Secured("ROLE_ADMIN")
    @GetMapping("/dashboard/sportsman")
    public ResponseEntity<Page<UserSportsmanDTO>> findAllSportsman(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<UserSportsmanDTO> userpage = userService.findAllSportsman(page, size);
        return ResponseEntity.ok(userpage);
        
    }

    private static final String EXERCISE_IMAGE_DIRECTORY = "./backend/src/main/resources/static/images/sportsman/";

    @GetMapping("/user/image/{imageNames}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageNames) throws IOException {
        System.out.println(imageNames);
        try {
            Path imagePath = Paths.get(EXERCISE_IMAGE_DIRECTORY + imageNames);
            Resource resource = new UrlResource(imagePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                // Determinar el tipo de contenido basado en la extensión del archivo
                MediaType contentType = determineContentType(imageNames);
                return ResponseEntity.ok()
                        .contentType(contentType)
                        .body(resource);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (MalformedURLException e) {
            // Manejar la excepción de URL mal formada
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private MediaType determineContentType(String imageName) {
        String[] parts = imageName.split("\\.");
        String extension = parts[parts.length - 1];
        return MediaType.parseMediaType("image/" + extension.toLowerCase());
    }

    @GetMapping("/search/{identification}")
    public ResponseEntity<Page<DayWeek>> getUserDetails(@PathVariable String identification, 
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<DayWeek> userDetailsPage = userService.findRoutineByUser(identification, pageable);
        return ResponseEntity.ok(userDetailsPage);
    }
}
