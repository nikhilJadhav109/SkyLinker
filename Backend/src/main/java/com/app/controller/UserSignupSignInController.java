package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthenticationResponse;
import com.app.dto.LoginDTO;
import com.app.dto.ResponseDTO;
import com.app.dto.UserDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.service.IUserService;
import com.app.pojos.User;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserSignupSignInController {

	// auto wire Authentication Manager for user authentication , created in
	// Security Config class
	// (currently based upon user details service)
	@Autowired
	private AuthenticationManager authManager;
	// auto wire JwtUtils for sending signed JWT back to the clnt
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private IUserService userService;

	@PostMapping("/signup")
	public ResponseEntity<?> signupUser(@RequestBody UserDTO userdto) {
		System.out.println("in signup user : " + userdto);
		userService.saveUser(userdto);
		return new ResponseEntity<>(new ResponseDTO<>("success", "Signup Successful...Please login...!!!"),
				HttpStatus.OK);
	}
	// add end point for user registration
//	@PostMapping("/signup")
//	public ResponseEntity<?> userRegistration(@RequestBody SignUpRequest request) {
//		System.out.println("in user reg " + request);
//		return ResponseEntity.ok(userService.registerUser(request));
//	}

	// add end point for user authentication
	@PostMapping("/signin")	
	public ResponseEntity<AuthenticationResponse> authenticateUser(@RequestBody LoginDTO request) {
		System.out.println( request.getPassword()+"-------------------------->><><><><><><");
		System.out.println(request.getEmail()+"-------------------------->><><><><><><");
		Authentication authentication = null,authenticated=null;
		 try { 
	    	
	         authentication = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
	         authenticated = authManager.authenticate(authentication);		
			  authentication = new UsernamePasswordAuthenticationToken(request.getEmail(),
			  request.getPassword()); authenticated =
			  authManager.authenticate(authentication);			
			  String jwtToken = jwtUtils.generateJwtToken(authenticated);
			  System.out.println(authentication+
					  "-------------------------->><><><><><><ORORO");
					  System.out.println(authenticated+
					  "-------------------------->><><><><><>RO");
			  
			  AuthenticationResponse response = new AuthenticationResponse(jwtToken);
			  return ResponseEntity.ok(response);
			 
			
			  } catch (AuthenticationException e) {
			  System.out.println("-------------------------->><><><><><><ERRRRRORORORO");
			   e.printStackTrace();
			  throw new RuntimeException("User authentication failed", e); }
			 
	}

	
	
	
//	public ResponseEntity<?> authenticateUser(@RequestBody LoginDTO request) {
//		System.out.println("in auth " + request);
//		try {
//			// Tries to authenticate the passed Authentication object, returning a fully
//			// populated Authentication object (including granted authorities)if successful.
//			Authentication authenticate = authManager.authenticate
//			// An o.s.s.c.Authentication i/f implementation used for simple presentation of
//			// a username and password.
//			// Actual dao based authentication takes place here internally(first email : here replaced username by email for authentication
//					
//			// n then pwd n then authorities gets validated)
//			(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
//			// => successful authentication : create JWT n send it to the clnt in the
//			// response.
//			System.out.println("auth success " + authenticate);
//			return ResponseEntity.ok(new AuthenticationResponse(jwtUtils.generateJwtToken(authenticate)));
//		} catch (Exception e) {
//			e.printStackTrace();
//			throw new RuntimeException("User authentication Failed", e);
//		}
//
//	}

}
