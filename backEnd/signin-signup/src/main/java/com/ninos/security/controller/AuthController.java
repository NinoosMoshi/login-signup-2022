package com.ninos.security.controller;


import com.ninos.security.dto.LoginResponse;
import com.ninos.security.jwt.JwtAuthenticationFilter;
import com.ninos.security.jwt.JwtLogin;
import com.ninos.security.model.User;
import com.ninos.security.service.AuthoritiesService;
import com.ninos.security.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@AllArgsConstructor
@RestController
@RequestMapping
public class AuthController {


    private JwtAuthenticationFilter jwtAuthenticationFilter;
    private UserService userService;
    private AuthoritiesService authoritiesService;
    private PasswordEncoder passwordEncoder;

    // http://localhost:8080/signin
    @PostMapping("/signin")
    public LoginResponse login(@RequestBody JwtLogin jwtLogin){
        return jwtAuthenticationFilter.login(jwtLogin);
    }



    // http://localhost:8080/signup
    @PostMapping("/signup")
    public void createUser(@RequestBody JwtLogin jwtLogin){

            User user = new User();
            user.setEmail(jwtLogin.getEmail());
            user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
            user.setActive(1);
            user.getAuthorities().add(authoritiesService.getAllAuthorities().get(0));
            userService.addUser(user);

    }





}

