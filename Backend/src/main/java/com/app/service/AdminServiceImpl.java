package com.app.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.UserAlreadyExistException;
import com.app.dao.BookingRepository;
import com.app.dao.CitiesRepository;
import com.app.dao.RoleRepository;
import com.app.dao.UserRepository;
import com.app.dto.CityDTO;
import com.app.dto.FeedbackDTO;
import com.app.dto.UserDTO;
import com.app.pojos.Cities;
import com.app.pojos.Role;
import com.app.pojos.User;
import com.app.pojos.UserRole;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService{
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private BookingRepository bookRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	@Autowired
	private CitiesRepository cityRepo;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@Override
	public User addManager(UserDTO managerdto) {
		User manager = new User();
		if(userRepo.findByEmail(managerdto.getEmail()) == null) {
			BeanUtils.copyProperties(managerdto, manager);
			manager.setPassword(encoder.encode(managerdto.getPassword()));
			manager.setUserRole(Role.MANAGER);
//			Set<UserRole> roles = managerdto.getRoles().stream().map(roleName -> roleRepo.findByRoleName(Role.valueOf(roleName)).get())
//					.collect(Collectors.toSet());
//			manager.setRoles(roles);
			System.out.println(manager);
			return userRepo.save(manager);
		}else
			throw new UserAlreadyExistException("User Already Exist, Please login or try with another email");
	}
	
	
	@Override
	public List<FeedbackDTO> getFeedback(int airId) {
		System.out.println("in get feedback :AdminService ");
		List<FeedbackDTO> fb=bookRepo.getFeedbackByAirlineId(airId);
		return fb;
	}
	@Override
	public int getTotalBooking() {
		return bookRepo.getTotalBooking();
	}
	
	@Override
	public int getCancelledBooking() {
		return bookRepo.getCancelledBooking();
	}
	
	

	

	@Override
	public void addCity(CityDTO cityDto) {
		List<Cities> cities=cityRepo.getCities();
		String[] cityArray=cityDto.getCityNames();
		if(cities.isEmpty()) {
			cityRepo.save(new Cities(cityArray[0]));
			cityRepo.save(new Cities(cityArray[1]));
		}
		else {
			for(int i=0; i<cityArray.length; i++) {
				boolean flag=false;
				while(!flag ) {
					for(Cities city:cities) {
						if((cityArray[i].equalsIgnoreCase(city.getCity()))) {
							flag=true;
							break;
						}
					}
					if(!flag)
						break;
				}
				if(!flag)
					cityRepo.save(new Cities(cityArray[i]));
			}
		}
	}


	

}
