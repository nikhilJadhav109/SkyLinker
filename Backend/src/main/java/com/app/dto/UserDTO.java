package com.app.dto;

import java.util.Set;

import com.app.pojos.UserRole;

public class UserDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String mobileNo;
	private int status;
	private Set<String> roles;
	public UserDTO() {
		System.out.println("in ctor of : "+getClass().getName());
	}
	
	public UserDTO(String firstName, String lastName, String email, String password, String mobileNo, int status, Set<String> roles) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.mobileNo = mobileNo;
		this.status = status;
		this.roles = roles;
	}

	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	
	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "UserDTO [firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", password="
				+ password + ", mobileNo=" + mobileNo + ", status=" + status + "]";
	}
}