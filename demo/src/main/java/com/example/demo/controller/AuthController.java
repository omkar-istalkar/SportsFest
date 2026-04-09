package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entity.User;
import com.example.demo.entity.UserData;
import com.example.demo.enums.Role;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.UserDataRepository;
import com.example.demo.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController 
{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RegistrationRepository repository;

    @Autowired private UserDataRepository userDataRepository;

    //Register user
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request)
    {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) 
        {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ROLE_USER);

        userRepository.save(user);

        UserData user1 = new UserData();
        user1.setId(user.getId());
        user1.setEmail(user.getEmail());
        user1.setName(user.getName());

        userDataRepository.save(user1);

        return "User Registration successfull";
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUserDetails(@PathVariable String id)
    {
        User user = repository.findByRegistrationId(id).getUser();
        String eventName = repository.findByRegistrationId(id).getEvent().getName();
        Map <String, Object> userData = new HashMap<>();
        userData.put("name", user.getName());
        userData.put("email", user.getEmail());
        userData.put("eventName", eventName);
        return ResponseEntity.ok(userData);
    }
}
