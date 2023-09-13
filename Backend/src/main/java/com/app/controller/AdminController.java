package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AirlineDTO;
import com.app.dto.CityDTO;
import com.app.dto.FeedbackDTO;
import com.app.dto.ResponseDTO;
import com.app.dto.UserDTO;
import com.app.service.IAirlineService;
import com.app.service.IAdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
	public AdminController() {
		System.out.println("in ctor of : " + getClass().getName());
	}

	@Autowired
	private IAdminService adService;
	
	@Autowired
	private IAirlineService airService;

	@PostMapping("/add_manager")
	public ResponseEntity<?> signupUser(@RequestBody UserDTO managerdto) {
		System.out.println("in add_manager ----------------------- : " + managerdto+"==================");
		
		return new ResponseEntity<>(new ResponseDTO<>("success", adService.addManager(managerdto)), HttpStatus.OK);

	}
	
	@PostMapping("/add_airline")
	public ResponseEntity<?> addAirline(@RequestBody AirlineDTO airlinedto){
		System.out.println("in add airline : "+airlinedto);
		airService.addAirline(airlinedto);
		return new ResponseEntity<>("Airline added to the db!!!", HttpStatus.OK);
	}
		
	@GetMapping("/feedback")
	public ResponseEntity<?> customerFeedback(@RequestParam int airId){
		System.out.println("in customer feedback: SuperAdminController ");
		List<FeedbackDTO> fb = adService.getFeedback(airId);
		if(fb.isEmpty())
			return new ResponseEntity<>(new ResponseDTO<>("error", "No feedbacks available"), HttpStatus.OK);
		else
			return new ResponseEntity<>(new ResponseDTO<>("success", fb), HttpStatus.OK);
	}
	
	@GetMapping("/airline_names")
	public ResponseEntity<?> AirlineNames() {
		System.out.println("in Airline names : ");
		return new ResponseEntity<>(new ResponseDTO<>("success", airService.getAirlineNames()), HttpStatus.OK);
	}
	
	@GetMapping("/get_total_bookings")
	public ResponseEntity<?> getTotalBooking(){
		return new ResponseEntity<>(new ResponseDTO<>("success", adService.getTotalBooking()), HttpStatus.OK);
	}
	
	@GetMapping("/get_cancelled_bookings")
	public ResponseEntity<?> getCancelledBooking(){
		return new ResponseEntity<>(new ResponseDTO<>("success", adService.getCancelledBooking()), HttpStatus.OK);
	}
	
			@PutMapping("/add_city")
	public ResponseEntity<?> addCity(@RequestBody CityDTO cityDto){
		System.out.println("in addCity : ");
		adService.addCity(cityDto);
		return new ResponseEntity<>("success",  HttpStatus.OK);
	}
}
