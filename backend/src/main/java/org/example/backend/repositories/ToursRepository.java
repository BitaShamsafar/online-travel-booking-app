package org.example.backend.repositories;

import org.example.backend.entities.Tour;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ToursRepository extends MongoRepository<Tour, String> {

    List<Tour> findAllByRatingGreaterThan(double ratingIsGreaterThan);
    List<Tour> findTop4ByRatingGreaterThan(double top4Rating);

}
