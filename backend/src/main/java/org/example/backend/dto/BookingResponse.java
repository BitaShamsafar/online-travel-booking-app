package org.example.backend.dto;

public record BookingResponse(
        String hotelId,
        String tourId,
        String checkIn,
        String checkOut,
        double totalAmount
) {
}
