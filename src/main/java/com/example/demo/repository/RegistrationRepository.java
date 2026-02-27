package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Registration;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
	List<Registration> findByEventId(Long eventId);
	Registration findByRegistrationId(String registrationId);
	void deleteByEventId(Long id);
}
