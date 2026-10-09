package com.example.GymManagement.entity;

import java.time.LocalDate;

public class ExpiryDateRequest {

    private LocalDate startDate;
    private int durationMonths;

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public int getDurationMonths() {
        return durationMonths;
    }

    public void setDurationMonths(int durationMonths) {
        this.durationMonths = durationMonths;
    }
}