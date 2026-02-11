package org.example.backend.repositories;

import org.example.backend.entities.Favorites;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritesRepository extends MongoRepository<@NotNull Favorites, @NotNull String> {
    List<Favorites> findAllByUserId(String userId);
}
