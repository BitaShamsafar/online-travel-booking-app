package org.example.backend.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Document(collection = "bookings")
public class Bookings {
    @Id
    private String id;

    private String hotelId;
    private String userId;
    private String tourId;
    private String checkIn;
    private String checkOut;
    private double totalAmount;
    private String status;
}
