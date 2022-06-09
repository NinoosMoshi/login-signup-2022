package com.ninos.security.service;

import com.ninos.security.dto.UserPrincipal;
import com.ninos.security.model.User;
import com.ninos.security.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByEmail(email);
        UserPrincipal userPrincipal = new UserPrincipal(user);
        return userPrincipal;
    }


    public void addUser(User user){
        userRepository.save(user);
    }


    public boolean emailExists(String email){
        return userRepository.existsByEmail(email);
    }



}

