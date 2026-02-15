package org.example.backend.services;

import lombok.AllArgsConstructor;
import org.example.backend.entities.Cities;
import org.example.backend.repositories.CitiesRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CitiesService {

    private final CitiesRepository repository;

    public List<Cities> getAllCities(){
        return repository.findAll();
    }
    public List<Cities> getAllCities(String value) {
        return repository.findTop10ByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(value, value);
    }

}
