package com.ninos.security.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NewPassword {

    private String email;
    private String password;
    private String code;


}