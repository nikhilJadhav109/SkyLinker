package com.app.service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.UserAlreadyExistException;
import com.app.custom_exceptions.UserNotFoundException;
import com.app.dao.RoleRepository;
import com.app.dao.UserRepository;
import com.app.dto.UserDTO;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.pojos.UserRole;
@Service
@Transactional
public class UserServiceImpl implements IUserService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private RoleRepository roleRepo;
	@Autowired
	private PasswordEncoder encoder;
	@Override
	public User getUser(String email, String password) {
//		User user =  userRepo.findByEmailAndPassword(email, password);
		User user =  userRepo.findByEmail(email);
//		String encPass = encoder.encode(password);
//		System.out.println("stored = "+user.getPassword());
//		System.out.println("encoded = "+encPass);
//		System.out.println(encoder.matches(encPass, user.getPassword()));
		System.out.println(email+", "+password + "IN Get USSSERRR");
		
		
		String generatedHash = BCrypt.hashpw(password, user.getPassword());
		boolean flag = generatedHash.equals(user.getPassword());
		if(user != null && flag)
			return user;
		else
			throw new UserNotFoundException("User not found, please try with correct credentials");
	}
	
	@Override
	public User saveUser(UserDTO userdto) {
		
		User user = new User();
//		if(true) {
		if(userRepo.findByEmail(userdto.getEmail()) == null) {
			System.out.println("Inside if" + userRepo.findByEmail(userdto.getEmail()));
			BeanUtils.copyProperties(userdto, user);
			user.setUserRole(Role.CUSTOMER);
//			user.setUserRole(Role.ADMIN); // uncomment to add admin during signup as new user and comment others
//			user.setUserRole(Role.MANAGER); // uncomment to add manager during signup as new user and comment others
//			Set<UserRole> roles = new HashSet<UserRole>();
//			roles.add(new UserRole(Role.ROLE_CUSTOMER));
//			user.setRoles(roles);
//			Set<UserRole> roles = userdto.getRoles().stream().map(roleName -> roleRepo.findByRoleName(Role.valueOf(roleName)).get())
//					.collect(Collectors.toSet());
//			
//			user.setRoles(roles);
			user.setPassword(encoder.encode(userdto.getPassword()));//set encoded pwd
			//System.out.println(user);
			System.out.println("Useeeeeer ------>  "+user);
			return userRepo.save(user);
		}else
			throw new UserAlreadyExistException("User Already Exist, Please login or try with another email");
		}
        @Override
	public User updateUserProfile(int userId, UserDTO userDTO) {
		System.out.println("inside updateUserProfile (service method) "+userDTO);
		User userDetails=userRepo.findById(userId).get();
		System.out.println("user details from "+userDetails);
		userDetails.setPassword(userDTO.getPassword());
		userDetails.setMobileNo(userDTO.getMobileNo());
		System.out.println("Updated user Details "+userDetails);
		return userDetails;
	}
}
