package com.ninos.repository;

import com.ninos.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface EmployeeRepository extends JpaRepository<Employee,Long> {

     Page<Employee> findEmployeeByFirstNameContaining(String firstName, Pageable pageable);

     @Query("select count (id) from Employee where firstName like %?1%")
     public Long getEmployeeLengthByKeySearch(String key);




}
