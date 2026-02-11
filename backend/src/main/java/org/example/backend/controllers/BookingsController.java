package org.example.backend.controllers;


import lombok.AllArgsConstructor;
import org.example.backend.dto.BookingNew;
import org.example.backend.dto.BookingResponse;
import org.example.backend.entities.Bookings;
import org.example.backend.services.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/bookings")
public class BookingsController {

    private final BookingService service;
    @GetMapping("{userId}")
    public List<BookingResponse> getAllBookings(@PathVariable String userId){
        return service.getAllBookings(userId);
    }

    @GetMapping("/new")
    public void addNewBooking(@RequestBody BookingNew booking){
        service.addNewBooking(booking);
    }

}
