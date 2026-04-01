package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.PublicUsers;

public interface PublicUserRepository extends JpaRepository<PublicUsers, Long>
{

}
