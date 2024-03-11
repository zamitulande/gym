package com.v1.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Saludo {

      @GetMapping("/saludo")
    public String saludo(){
        return "hola, saludando";
    }

    @GetMapping("/saludosec")
    public String saludoSec(){
        return "hola, saludando securo";
    }
}
