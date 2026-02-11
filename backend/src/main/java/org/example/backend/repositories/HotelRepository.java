package org.example.backend.repositories;

import org.example.backend.entities.Hotel;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HotelRepository extends MongoRepository<@NotNull Hotel, @NotNull String> {
    @NotNull Optional<Hotel> findById(String id);
    List<Hotel> findByName(String name);
    List<Hotel> findFirstByRating(int rating);
}
