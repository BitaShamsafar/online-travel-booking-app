package org.example.backend.controllers;


import lombok.RequiredArgsConstructor;
import org.example.backend.entities.Favorites;
import org.example.backend.services.FavoritesService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/favorites")
@RequiredArgsConstructor
public class FavoritesController {
    private final FavoritesService service;

    @GetMapping("{userId}")
    public List<Favorites> getAllFavorites(@PathVariable String userId) {
        return service.getAllFavorites(userId);
    }

}
