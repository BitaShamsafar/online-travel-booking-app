package org.example.backend.controllers;

import lombok.AllArgsConstructor;
import org.example.backend.entities.Tour;
import org.example.backend.services.ToursService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tour")
@AllArgsConstructor
public class ToursController {
    private final ToursService service;

    @GetMapping("/all")
    public List<Tour> findAll() {
        return service.findAll();
    }

    @GetMapping("/topTours")
    public List<Tour> findTopTours() {
        return service.findTop4ByRatingGreaterThan(4.5);
    }

    @GetMapping("/byRating/{minRate}")
    public List<Tour> findByRating(@PathVariable double minRate) {
        return service.findAllByRating(minRate);
    }

}
