package org.example.backend.services;

import lombok.RequiredArgsConstructor;
import org.example.backend.entities.Hotel;
import org.example.backend.repositories.HotelRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelService {

    private final HotelRepository repo;

    public List<Hotel> getAllHotels(){
        return repo.findAll();
    }
    public Hotel getHotelById(String id){
        return repo.findById(id).orElse(null);
    }
}
