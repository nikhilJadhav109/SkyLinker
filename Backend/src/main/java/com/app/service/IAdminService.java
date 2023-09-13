package com.app.service;

import java.util.List;

import com.app.dto.CityDTO;
import com.app.dto.FeedbackDTO;
import com.app.dto.UserDTO;
import com.app.pojos.User;

public interface IAdminService {
	//method to add manaer
	User addManager(UserDTO manager);
	
	//method to check feedback from customer
	List<FeedbackDTO> getFeedback(int airId);
		
	//method to get total number of bookings
	int getTotalBooking();
	
	//method to get total number of cancelled bookings
	int getCancelledBooking();
	
		
	//method to add City in City Table
	void addCity(CityDTO cityDto);

}
