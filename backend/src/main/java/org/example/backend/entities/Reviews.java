package org.example.backend.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@Document(collection = "reviews")
public class Reviews {

    @Id
    private String id;
    private String userId;
    private String hotelId;
    private String comment;
    private Integer rating;
    private String date;
}
