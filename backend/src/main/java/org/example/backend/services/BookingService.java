package org.example.backend.services;

import lombok.AllArgsConstructor;
import org.example.backend.models.Bookings;
import org.example.backend.repositories.BookingsRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BookingService {

    private final BookingsRepository repository;

    public List<Bookings> getAllBookings(String userId){
        return repository.findAllByUserId(userId);
    }

}
