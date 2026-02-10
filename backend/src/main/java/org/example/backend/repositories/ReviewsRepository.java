package org.example.backend.repositories;

import org.example.backend.models.Reviews;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewsRepository extends MongoRepository<@NotNull Reviews, @NotNull String> {
    List<Reviews> findAllByUserId(String userId);
    List<Reviews> findAllByHotelId(String hotelId);
}
