package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Registration;
import com.example.demo.enums.RegistrationStatus;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {

    @Query("SELECT r FROM Registration r JOIN FETCH r.event WHERE r.event.id = :eventId")
    List<Registration> findByEventId(@Param("eventId") Long eventId);

    Registration findByRegistrationId(String registrationId);

    void deleteByEvent_Id(Long id);

    List<Registration> findByStatus(RegistrationStatus status);

    @Query(value = "SELECT MAX(CAST(SUBSTRING(registration_id, 5) AS UNSIGNED)) FROM registrations", nativeQuery = true)
    Integer findMaxRegistrationNumber();
}