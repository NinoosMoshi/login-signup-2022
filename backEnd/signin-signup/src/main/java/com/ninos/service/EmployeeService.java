package com.ninos.service;

import com.ninos.dto.EmployeeDTO;
import com.ninos.dto.EmployeeResponse;


public interface EmployeeService {

    EmployeeResponse getEmployees(int pageNumber,int pageSize);

    EmployeeResponse getEmployeeByKeySearch(String key, int pageNumber,int pageSize);

    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);

    public Long getNumbersOfEmployee();

    public Long getEmployeeSizeByKeySearch(String key);



}
