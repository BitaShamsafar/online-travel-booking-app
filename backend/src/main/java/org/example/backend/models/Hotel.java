package org.example.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "hotels")
public class Hotel{
    @Id
    private String id;

    private String name;
    private String description;
    private double pricePerNight;
    private int rating;
    private String location;
    private String[] facilities;
    private String[] images;

}
