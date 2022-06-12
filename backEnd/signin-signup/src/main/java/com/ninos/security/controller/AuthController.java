package com.ninos.security.controller;


import com.ninos.security.dto.AccountResponse;
import com.ninos.security.dto.ActiveAccount;
import com.ninos.security.dto.LoginResponse;
import com.ninos.security.dto.UserActive;
import com.ninos.security.jwt.JwtAuthenticationFilter;
import com.ninos.security.jwt.JwtLogin;
import com.ninos.security.mail.Email;
import com.ninos.security.mail.EmailService;
import com.ninos.security.model.Code;
import com.ninos.security.model.User;
import com.ninos.security.service.AuthoritiesService;
import com.ninos.security.service.UserService;
import com.ninos.util.RandomCode;
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
    private EmailService emailService;

    // http://localhost:8080/signin
    @PostMapping("/signin")
    public LoginResponse login(@RequestBody JwtLogin jwtLogin){
        return jwtAuthenticationFilter.login(jwtLogin);
    }



    // http://localhost:8080/signup
    @PostMapping("/signup")
    public AccountResponse createUser(@RequestBody JwtLogin jwtLogin){

            AccountResponse accountResponse = new AccountResponse();
            boolean result = userService.emailExists(jwtLogin.getEmail());

            if (result){
                accountResponse.setResult(0);
            }else{
                String myCode = RandomCode.generateCode();
                User user = new User();
                user.setEmail(jwtLogin.getEmail());
                user.setPassword(passwordEncoder.encode(jwtLogin.getPassword()));
                user.setActive(0);
                user.getAuthorities().add(authoritiesService.getAllAuthorities().get(0));

                Email mail = new Email(jwtLogin.getEmail(), myCode);
                emailService.sendCodeByMail(mail);
                Code code = new Code();
                code.setCode(myCode);
                user.setCode(code);
                userService.addUser(user);

                accountResponse.setResult(1);
            }

            return accountResponse;
    }


    //http://localhost:8080/active
    @PostMapping("/active")
    public UserActive getActiveUser(@RequestBody JwtLogin jwtLogin){
        String enPassword = userService.getPasswordByEmail(jwtLogin.getEmail());  // get password this email from mysql
        boolean result = passwordEncoder.matches(jwtLogin.getPassword(),enPassword); // match password that user entered with password in mysql
        UserActive userActive = new UserActive();
        if (result){
            int act = userService.getUserActive(jwtLogin.getEmail());
            userActive.setActive(act);
        }else{
          userActive.setActive(-1);   // return -1 if email and password are wrong
        }


       return userActive;
    }




    //http://localhost:8080/activated
    @PostMapping("/activated")
    public AccountResponse activeAccount(@RequestBody ActiveAccount activeAccount){
        User user = userService.getUserByMail(activeAccount.getEmail());
        AccountResponse accountResponse = new AccountResponse();
        if (user.getCode().getCode().equals(activeAccount.getCode())){  // user.getCode().getCode() from db, activeAccount.getCode() you entered
            user.setActive(1);
            userService.editUser(user);
            accountResponse.setResult(1);
        }else {
            accountResponse.setResult(0);
        }
        return  accountResponse;
    }





}

