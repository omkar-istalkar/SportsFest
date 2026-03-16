package com.example.demo.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;

@Service
public class AdminService implements UserDetailsService{

	@Autowired
	private AdminRepository adminRepository;
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException
	{
		Admin admin = adminRepository.findByUserName(userName);
		
		if (admin == null) {
			throw new UsernameNotFoundException("Admin not found");
		}
		
		return new User(admin.getUserName(), admin.getPassword(), Collections.EMPTY_LIST);
	}
}