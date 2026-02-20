package org.example.backend.services;

import lombok.AllArgsConstructor;
import org.example.backend.entities.Tour;
import org.example.backend.repositories.ToursRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ToursService {
    private final ToursRepository repository;

    public List<Tour> findAll() {
        return repository.findAll();
    }

    public List<Tour> findTop4ByRatingGreaterThan(double top4Rating) {
        return repository.findTop4ByRatingGreaterThan(top4Rating);
    }

    public List<Tour> findAllByRating(double rating){
        return repository.findAllByRatingGreaterThan(rating);
    }
}
