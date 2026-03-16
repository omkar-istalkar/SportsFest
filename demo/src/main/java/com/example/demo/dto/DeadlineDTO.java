package com.example.demo.dto;

import java.time.LocalDate;

public class DeadlineDTO {

    private Long eventId;
    private String eventName;
    private LocalDate deadline;
    private long daysRemaining;
    private String status;

    public DeadlineDTO(Long eventId, String eventName, LocalDate deadline, long daysRemaining, String status) {
        this.eventId = eventId;
        this.eventName = eventName;
        this.deadline = deadline;
        this.daysRemaining = daysRemaining;
        this.status = status;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public long getDaysRemaining() {
        return daysRemaining;
    }

    public String getStatus() {
        return status;
    }
}