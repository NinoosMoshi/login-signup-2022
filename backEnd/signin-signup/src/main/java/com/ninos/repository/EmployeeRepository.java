package com.ninos.repository;

import com.ninos.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee,Long> {

     Page<Employee> findEmployeeByFirstNameContaining(String firstName, Pageable pageable);




}
