package org.example.backend.repositories;

import org.example.backend.dto.BookingResponse;
import org.example.backend.entities.Bookings;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingsRepository extends MongoRepository<@NotNull Bookings, @NotNull String> {
        List<BookingResponse> findAllByUserId(String userId);
}
