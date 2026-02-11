package org.example.backend.services;

import lombok.AllArgsConstructor;
import org.example.backend.dto.BookingNew;
import org.example.backend.dto.BookingResponse;
import org.example.backend.entities.Bookings;
import org.example.backend.repositories.BookingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class BookingService {

    private final BookingsRepository repository;

    public List<BookingResponse> getAllBookings(String userId){
        return repository.findAllByUserId(userId);
    }

    public void addNewBooking(BookingNew newBooking){
        Bookings booking = Bookings.builder()
                .id(UUID.randomUUID().toString())
                .checkIn(newBooking.checkIn())
                .checkOut(newBooking.checkOut())
                .hotelId(newBooking.hotelId())
                .tourId(newBooking.tourId())
                .totalAmount(newBooking.totalAmount())
                .status("PENDING")
                .build();
        repository.save(booking);

    }

}
