package org.example.backend.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tours")
public class Tour {
    @Id
    private String id;
    private String name;
    private String image;
    private String location;
    private int durationDays;
    private float price;
    private int maxPeople;
    private float rating;
    private String hotelName;
    private String hotelId;

}
