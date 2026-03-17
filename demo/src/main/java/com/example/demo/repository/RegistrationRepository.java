package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Registration;
import com.example.demo.enums.RegistrationStatus;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    // Registrations of a specific event
    @Query("SELECT r FROM Registration r JOIN FETCH r.event WHERE r.event.id = :eventId")
    List<Registration> findByEventId(@Param("eventId") Long eventId);

    // Find by registration id
    Registration findByRegistrationId(String registrationId);

    // Delete registrations of event
    void deleteByEvent_Id(Long id);

    // Registrations by status
    List<Registration> findByStatus(RegistrationStatus status);

    // Max registration number
    @Query(value = "SELECT MAX(CAST(SUBSTRING(registration_id, 5) AS UNSIGNED)) FROM registrations", nativeQuery = true)
    Integer findMaxRegistrationNumber();

    // Dashboard queries
    long countByUser_Id(Long userId);

    long countByUser_IdAndStatus(Long userId, RegistrationStatus status);

    List<Registration> findByUser_Id(Long userId);

    // Optional (can keep if needed elsewhere)
    List<Registration> findByUser_Email(String email);
}