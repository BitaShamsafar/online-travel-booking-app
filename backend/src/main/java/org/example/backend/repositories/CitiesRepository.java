package org.example.backend.repositories;

import org.example.backend.entities.Cities;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CitiesRepository extends MongoRepository<Cities, String> {

    List<Cities> findTop10ByNameContainingIgnoreCaseOrCountryContainingIgnoreCase(String country, String name);
}
