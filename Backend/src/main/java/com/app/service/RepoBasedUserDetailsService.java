package com.app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.dao.UserRepository;
import com.app.pojos.User;


@Service
public class RepoBasedUserDetailsService implements UserDetailsService {
	@Autowired
	private UserRepository userRepo;

	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		System.out.println("in load user " +userName);
		// replaced userName by email
//		User user = userRepo.findByUserName(userName)
//				.orElseThrow(() -> new UsernameNotFoundException("User Name " + userName + " not found!!!"));
		Optional<User> optional = userRepo.findUserByEmail(userName);
		User user = optional
				.orElseThrow(() -> new UsernameNotFoundException("User With Email  " +userName + " not found!!!"));
		return new CustomUserDetails(user);
	}

}

