package com.example.demo.service;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Admin;
import com.example.demo.entity.User;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String login)
            throws UsernameNotFoundException {

        System.out.println("========== LOGIN DEBUG ==========");
        System.out.println("Login input received: " + login);

        // ADMIN CHECK
        Admin admin = adminRepository.findByUserName(login);

        if(admin != null){

            System.out.println("Admin found: " + admin.getUserName());

            return new org.springframework.security.core.userdetails.User(
                    admin.getUserName(),
                    admin.getPassword(),
                    Collections.singletonList(
                            new SimpleGrantedAuthority("ROLE_ADMIN")
                    )
            );
        }

        // USER CHECK
        Optional<User> userOpt = userRepository.findByEmail(login);

        if(userOpt.isPresent()){

            User user = userOpt.get();

            System.out.println("User found: " + user.getEmail());

            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    Collections.singletonList(
                            new SimpleGrantedAuthority(user.getRole().name())
                    )
            );
        }

        System.out.println("User NOT FOUND");
        System.out.println("=================================");

        throw new UsernameNotFoundException("User not found");
    }
}