package org.example.backend.services;


import lombok.RequiredArgsConstructor;
import org.example.backend.entities.Favorites;
import org.example.backend.repositories.FavoritesRepository;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class FavoritesService {
    private final FavoritesRepository repository;

    public List<Favorites> getAllFavorites(String userId) {
        return repository.findAllByUserId(userId);
    }

}
