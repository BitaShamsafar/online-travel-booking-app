package org.example.backend.controllers;
import lombok.RequiredArgsConstructor;
import org.example.backend.entities.Hotel;
import org.example.backend.services.HotelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class HotelController {

    private final HotelService service;

    @GetMapping("/hotels")
    public List<Hotel> getAllHotels() {
       return service.getAllHotels();
    }

    @GetMapping("/hotel/{id}")
    public Hotel getHotel(@PathVariable String id) {
        return service.getHotelById(id);
    }
}
