package org.example.backend.controllers;
import lombok.RequiredArgsConstructor;
import org.example.backend.entities.Hotel;
import org.example.backend.services.HotelService;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("hotels/search")
    public List<Hotel> getHotelsByLocation(@RequestParam String location) {
        return service.getByLocation(location);
    }

    @GetMapping("/topHotels")
    public List<Hotel> getTopHotels() { return  service.getTopHotels();}

    @GetMapping("/hotel/{id}")
    public Hotel getHotel(@PathVariable String id) {
        return service.getHotelById(id);
    }
}
