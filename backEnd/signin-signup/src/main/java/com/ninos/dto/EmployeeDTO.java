package com.ninos.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class EmployeeDTO {

    private Long id;

    @NotEmpty(message = "First Name Should not be null or empty")
    private String firstName;

    @NotEmpty(message = "Last Name Should not be null or empty")
    private String lastName;

    @NotEmpty(message = "Email should not be null or empty")
    @Email
    private String email;

}
