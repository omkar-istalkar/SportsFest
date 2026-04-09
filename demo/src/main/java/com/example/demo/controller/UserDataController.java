package com.example.demo.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.UserData;
import com.example.demo.repository.UserDataRepository;
import com.example.demo.service.UserDataService;

@RestController
@RequestMapping("/api/userdata")
@CrossOrigin
public class UserDataController
{

    @Autowired
    private UserDataService userDataService;

    @Autowired
    private UserDataRepository userDataRepository;

    @GetMapping("/user/{email}")
    public Map<String, String> getData(@PathVariable String email)
    {
        Map<String, String> response = new HashMap<>();
        UserData user = userDataService.fetchUserData(email);

        String base64Image = null;

        if (user.getPhoto() != null) {
            base64Image = "data:image/jpeg;base64," + Base64.getEncoder().encodeToString(user.getPhoto());
        }

        response.put("image", base64Image);
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("phone", user.getPhoneNo());
        response.put("address", user.getAddress());
        return response;
    }

    @PostMapping("/update")
    public String updateUserdata( @RequestParam String address, @RequestParam String phone, @RequestParam(required = false) MultipartFile image, @RequestParam String email)
    {
        System.out.println("\n\n\n\nEmail:"+email+"\n\n\n");
        UserData user = userDataRepository.findByEmail(email);
        user.setAddress(address);
        user.setPhoneNo(phone);
        if(image != null && !image.isEmpty())
        try {
            user.setPhoto(image.getBytes());
        } catch (IOException e) {
            return "Problem in image uploading";
        }
        userDataRepository.save(user);
        return "";
    }
}