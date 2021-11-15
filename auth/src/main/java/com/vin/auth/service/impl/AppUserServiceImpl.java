package com.vin.auth.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vin.auth.model.AppUser;
import com.vin.auth.model.Role;
import com.vin.auth.repository.AppUserRepository;
import com.vin.auth.repository.RoleRepository;
import com.vin.auth.service.AppUserService;



@Service

@Transactional
public class AppUserServiceImpl implements AppUserService , UserDetailsService{
	
	
	@Autowired
	private AppUserRepository appUserRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	@Override
	public void saveAppUser(AppUser appUser) {
		
		appUser.setPassword(passwordEncoder.encode(appUser.getPassword()));
		appUserRepository.save(appUser);
	}
	
	
	@Override
	public List<AppUser> getAllUsers() {
		return appUserRepository.findAll();
	}
	
	@Override
	public AppUser getUser(String username) {
		return appUserRepository.findByUsername(username);
	}
	
	@Override
	public void saveRole(Role role) {
		roleRepository.save(role);
	}
	
	@Override
	public void addRoleTouser(String username, String rolename) {
		
		AppUser user = appUserRepository.findByUsername(username);
		
		Role role = roleRepository.findByName(rolename);
		
		user.getRoles().add(role);
		
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		AppUser user = appUserRepository.findByUsername(username);
		if(user == null) {
			throw new UsernameNotFoundException("User with given username not found.");
		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		
		user.getRoles().forEach(role -> {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		});
		return new User(user.getUsername(), user.getPassword(), authorities);
	}

}
