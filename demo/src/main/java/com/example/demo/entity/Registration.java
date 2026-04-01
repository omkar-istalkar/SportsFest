package com.example.demo.entity;

import java.time.LocalDateTime;

import javax.persistence.*;

import com.example.demo.enums.RegistrationStatus;

@Entity
@Table(name = "registrations")
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String registrationId;

    @Column(columnDefinition = "TEXT")
    private String dynamicData;

    private LocalDateTime registeredAt;

    @Enumerated(EnumType.STRING)
    private RegistrationStatus status;

    // EVENT RELATION
    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    // USER RELATION (IMPORTANT FOR USER DASHBOARD)
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "public_user_id")
    private PublicUsers publicUser;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(String registrationId) {
        this.registrationId = registrationId;
    }

    public String getDynamicData() {
        return dynamicData;
    }

    public void setDynamicData(String dynamicData) {
        this.dynamicData = dynamicData;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public void setRegisteredAt(LocalDateTime registeredAt) {
        this.registeredAt = registeredAt;
    }

    public RegistrationStatus getStatus() {
        return status;
    }

    public void setStatus(RegistrationStatus status) {
        this.status = status;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

        public PublicUsers getPublicUser() {
        return publicUser;
    }

    public void setPublicUser(PublicUsers publicUser) {
        this.publicUser = publicUser;
    }

    @PrePersist
    protected void onCreate() {
        if (this.registeredAt == null) {
            this.registeredAt = LocalDateTime.now();
        }
    }
}