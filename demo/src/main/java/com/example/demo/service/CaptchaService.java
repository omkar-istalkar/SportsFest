package com.example.demo.service;

import java.util.Random;

import org.springframework.stereotype.Service;

@Service
public class CaptchaService 
{
    private static final String CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    public String generateCaptcha(int length)
    {
        Random random = new Random();
        StringBuilder captcha = new StringBuilder();

        for(int i = 0; i < length; i++)
        {
            captcha.append(CHAR_SET.charAt(random.nextInt(CHAR_SET.length())));
        }

        return captcha.toString();
    }

    public boolean validCaptcha(String input, String stored)
    {
        return stored != null && stored.equals(input);
    }
}