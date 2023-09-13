package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.User;


public interface UserRepository extends JpaRepository<User, Integer>{
	@Query("select u from User u where email=:em and password=:pwd")
	User getUser(@Param("em") String email, @Param("pwd") String password);
	//method to find user by email
	User findByEmail(String email);
//	User findByEmail(String email);
	//Method for user login
	User findByEmailAndPassword(String email, String password);
	
	@Query("select distinct u from User u join fetch u.roles where u.email=:em")
	Optional<User> findUserByEmail(@Param("em") String email);
//	Optional<User> findByEmail(@Param("em") String email);
	
//	@Query("select distinct u from User u join fetch u.roles where u.userName=:nm")
//	Optional<User> findByUserName(@Param("nm") String userName);
}
