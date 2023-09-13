package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.app.dto.FeedbackDTO;
import com.app.pojos.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
	
	
	@Query("select b from Booking b where b.airlineId=:id")
	List<Booking> getBookingByAirlineId(@Param("id") int airId);

	@Modifying
	@Query("Update Booking b set b.feedback=:fd where b.id=:bid")
	void postFeedback(@Param("bid") int bookingId, @Param("fd") String feedback);
	
	List<Booking> findByAirlineId(int airID);
	
	@Query("select b.airlineId from Booking b where b.id=:bid")
	int getAirlineIdByBookingId(@Param("bid")int bookingId);
	
	
	@Query("select new com.app.dto.FeedbackDTO(b.airlineId,b.id,b.userId.id,b.feedback) from Booking b where b.airlineId=:id")
	List<FeedbackDTO> getFeedbackByAirlineId(@Param("id") Integer airId);
	
	
	@Query("select b from Booking b where b.userId.id=:id")
	List<Booking> getBookingByUserId(@Param("id") int userId);
	
	@Query("select count(b.id) from Booking b ")
	int getTotalBooking();
	
	@Query("select count(b.id) from Booking b where status=0")
	int getCancelledBooking();
	
	
	
	
}