package com.ninos.service;

import com.ninos.dto.EmployeeResponse;

public interface EmployeeService {

    EmployeeResponse getAllEmployee(int pageNo, int pageSize, String sortBy, String sortDir);

}
