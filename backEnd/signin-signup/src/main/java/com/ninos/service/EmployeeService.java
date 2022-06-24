package com.ninos.service;

import com.ninos.dto.EmployeeDTO;
import com.ninos.dto.EmployeeResponse;
import com.ninos.model.Employee;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse getEmployees(int pageNumber,int pageSize);

    EmployeeResponse getEmployeeByKeySearch(String key, int pageNumber,int pageSize);

    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);

}
