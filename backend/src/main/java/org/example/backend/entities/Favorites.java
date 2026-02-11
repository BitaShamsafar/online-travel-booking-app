package org.example.backend.entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "favorites")
public class Favorites {

    @Id
    private String id;
    private String userId;

    private List<String> hotelIds;
    private List<String> tourIds;
}
