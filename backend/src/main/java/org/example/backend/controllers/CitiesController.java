package org.example.backend.controllers;


import lombok.AllArgsConstructor;
import org.example.backend.entities.Cities;
import org.example.backend.services.CitiesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/cities")
@AllArgsConstructor
public class CitiesController {

    private final CitiesService service;

    @GetMapping
    public List<Cities> findAll() {
        return service.getAllCities();
    }
    @GetMapping("{value}")
    public List<Cities> getAllCities(@PathVariable String value) {
        return service.getAllCities(value);
    }
}
