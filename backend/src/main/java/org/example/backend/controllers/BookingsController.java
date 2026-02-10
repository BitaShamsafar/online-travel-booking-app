package org.example.backend.controllers;


import lombok.AllArgsConstructor;
import org.example.backend.models.Bookings;
import org.example.backend.services.BookingService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/bookings")
public class BookingsController {

    private final BookingService service;
    @GetMapping("{userId}")
    public List<Bookings> getAllBookings(@PathVariable String userId){
        return service.getAllBookings(userId);
    }

}
