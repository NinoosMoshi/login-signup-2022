package com.ninos.security.service;

import com.ninos.security.model.Authorities;
import com.ninos.security.repository.AuthoritiesRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@AllArgsConstructor
@Service
public class AuthoritiesService {

    private AuthoritiesRepository authoritiesRepository;


    @Transactional(readOnly = true)
    public List<Authorities> getAllAuthorities(){
        return authoritiesRepository.findAll();
    }



}