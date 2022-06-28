package com.ninos.controller;

import com.ninos.dto.EmployeeDTO;
import com.ninos.dto.EmployeeResponse;
import com.ninos.model.Employee;
import com.ninos.service.EmployeeService;
import com.ninos.util.AppConstants;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/v1/employees")
public class EmployeeController {

    private EmployeeService employeeService;



    // http://localhost:8080/api/v1/employees/all?pageNumber={value}&pageSize={value}
    @GetMapping("/all")
    public EmployeeResponse getAllPosts(@RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize
    ){
        return employeeService.getEmployees(pageNumber,pageSize);
    }


    // http://localhost:8080/api/v1/employees/search?word={value}&pageNumber={value}&pageSize={value}
    @GetMapping("/search")
     public EmployeeResponse getEmployeeByKey(@RequestParam("word") String word,
                                              @RequestParam("pageNumber") int pageNumber, @RequestParam("pageSize") int pageSize){
        return employeeService.getEmployeeByKeySearch(word,pageNumber,pageSize);
     }


    // http://localhost:8080/api/v1/employees/save
    @PostMapping("/save")
    public ResponseEntity<EmployeeDTO> createNewEmployee(@Valid @RequestBody EmployeeDTO employeeDTO){
        EmployeeDTO newEmployeeDTO = employeeService.createEmployee(employeeDTO);
        return new ResponseEntity<>(newEmployeeDTO, HttpStatus.CREATED);
    }


    // http://localhost:8080/api/v1/employees/size
    @GetMapping("/size")
    public Long getEmployeeNum(){
        return employeeService.getNumbersOfEmployee();
    }



    // http://localhost:8080/api/v1/employees/key-search?key={value}
    @GetMapping("/key-search")
    public Long getEmployeeLengthByKey(@RequestParam String key){
        return employeeService.getEmployeeSizeByKeySearch(key);
    }


}
