package com.app.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dao.AirlineRepository;
import com.app.dao.CitiesRepository;
import com.app.dto.ResponseDTO;
import com.app.pojos.Airline;
import com.app.service.IAirlineService;

@RestController
@CrossOrigin
public class CitiesController {
	public CitiesController() {
		System.out.println("in cities Controller");
	}
	
	@Autowired
	private CitiesRepository cRepo;
	
	@Autowired
	private IAirlineService airService;
	
	@GetMapping("/cities")
	public ResponseEntity<?> getCities(){
		return new ResponseEntity<>(new ResponseDTO<>("success", cRepo.getCities()), HttpStatus.OK);
	}
	
	@GetMapping("/search_flight/{departureDate}")
	//@GetMapping("/search_flight/{fromCity}/{toCity}/{departureDate}")
	public ResponseEntity<?> searchFlight(@RequestParam String fromCity, @RequestParam String toCity,
			@PathVariable String departureDate) {
		List<Airline> flightList = airService.searchFlights(fromCity, toCity, LocalDate.parse(departureDate));
		if (!flightList.isEmpty()) {
			return new ResponseEntity<>(flightList, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Currently No Flights Available For this Route", HttpStatus.OK);
		}

	}
}
