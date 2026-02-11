package org.example.backend.controllers;
import lombok.RequiredArgsConstructor;
import org.example.backend.entities.Reviews;
import org.example.backend.services.ReviewsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/reviews")
public class ReviewsController {
    private final ReviewsService service;

    @GetMapping("{hotelId}")
    public List<Reviews> findAllByHotelId(@PathVariable String hotelId) {
        return service.findAllByHotelId(hotelId);
    }

    @GetMapping("{userId}")
    public List<Reviews> findAllByUserId(@PathVariable String userId) {
        return service.findAllByUserId(userId);
    }
}
