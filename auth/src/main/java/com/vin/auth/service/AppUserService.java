package com.vin.auth.service;

import java.util.List;

import com.vin.auth.model.AppUser;
import com.vin.auth.model.Role;

public interface AppUserService {

	void saveAppUser(AppUser appUser);

	List<AppUser> getAllUsers();

	void saveRole(Role role);

	AppUser getUser(String username);

	void addRoleTouser(String username, String rolename);

}
