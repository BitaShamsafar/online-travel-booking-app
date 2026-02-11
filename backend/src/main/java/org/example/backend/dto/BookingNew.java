package org.example.backend.dto;

public record BookingNew(
        String hotelId,
        String userId,
        String tourId,
        String checkIn,
        String checkOut,
        double totalAmount
) {
}
