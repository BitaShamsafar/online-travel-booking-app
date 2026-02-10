package org.example.backend.repositories;

import org.example.backend.models.Bookings;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingsRepository extends MongoRepository<@NotNull Bookings, @NotNull String> {
        List<Bookings> findAllByUserId(String userId);
}
