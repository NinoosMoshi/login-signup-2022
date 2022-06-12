package com.ninos.security.service;

import com.ninos.security.dto.UserPrincipal;
import com.ninos.security.model.User;
import com.ninos.security.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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


    @Transactional  // we add @Transactional to manage our session
    public int getUserActive(String email){
        return userRepository.getActive(email);
    }



    @Transactional
    public String getPasswordByEmail(String email){
        return userRepository.getPasswordByEmail(email);
    }


    public User getUserByMail(String mail){
        return userRepository.findUserByEmail(mail);
    }


    public void editUser(User user){
        userRepository.save(user);
    }



}

