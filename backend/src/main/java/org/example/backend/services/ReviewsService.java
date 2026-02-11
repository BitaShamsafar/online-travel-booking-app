package org.example.backend.services;

import lombok.AllArgsConstructor;
import org.example.backend.entities.Reviews;
import org.example.backend.repositories.ReviewsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ReviewsService {

    private final ReviewsRepository repository;

    public List<Reviews> findAllByHotelId(String hotelId) {
        return repository.findAllByHotelId(hotelId);
    }
    public List<Reviews> findAllByUserId(String userId) {
        return repository.findAllByUserId(userId);
    }
}
