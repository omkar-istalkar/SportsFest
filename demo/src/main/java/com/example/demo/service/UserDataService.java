package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.UserData;
import com.example.demo.repository.UserDataRepository;

@Service
public class UserDataService 
{
    @Autowired
    private UserDataRepository userDataRepository;

    public UserData fetchUserData(String email)
    {
        UserData user = userDataRepository.findByEmail(email);
        return user;
    }
}