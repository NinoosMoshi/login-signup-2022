package com.ninos.service.impl;

import com.ninos.dto.EmployeeDTO;
import com.ninos.dto.EmployeeResponse;
import com.ninos.model.Employee;
import com.ninos.repository.EmployeeRepository;
import com.ninos.service.EmployeeService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private ModelMapper mapper;

    @Override
    public EmployeeResponse getEmployees(int pageNumber,int pageSize) {

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Page<Employee> employees = employeeRepository.findAll(pageable);

        // get content for page object
        List<Employee> listOfEmployees = employees.getContent();

        List<EmployeeDTO> content = listOfEmployees.stream().map(temp -> mapToDTO(temp)).collect(Collectors.toList());

        EmployeeResponse employeeResponse = new EmployeeResponse();
        employeeResponse.setEmployeeDTOS(content);
        employeeResponse.setPageNumber(employees.getNumber());
        employeeResponse.setPageSize(employees.getSize());
        employeeResponse.setTotalElements(employees.getTotalElements());
        employeeResponse.setTotalPages(employees.getTotalPages());
        employeeResponse.setLast(employees.isLast());
        return employeeResponse;
    }

    @Override
    public EmployeeResponse getEmployeeByKeySearch(String key, int pageNumber,int pageSize) {
        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNumber,pageSize);

        Page<Employee> employees = employeeRepository.findEmployeeByFirstNameContaining(key,pageable);

        // get content for page object
        List<Employee> listOfEmployees = employees.getContent();

        List<EmployeeDTO> content = listOfEmployees.stream().map(temp -> mapToDTO(temp)).collect(Collectors.toList());

        EmployeeResponse employeeResponse = new EmployeeResponse();
        employeeResponse.setEmployeeDTOS(content);
        employeeResponse.setPageNumber(employees.getNumber());
        employeeResponse.setPageSize(employees.getSize());
        employeeResponse.setTotalElements(employees.getTotalElements());
        employeeResponse.setTotalPages(employees.getTotalPages());
        employeeResponse.setLast(employees.isLast());
        return employeeResponse;
    }



    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        // convert DTO to Entity
        Employee employee = mapToEntity(employeeDTO);
        Employee newEmployee = employeeRepository.save(employee);

        // convert Entity to DTO
        EmployeeDTO employeeResponse = mapToDTO(newEmployee);
        return employeeResponse;
    }



        // convert DTO into Entity
        private Employee mapToEntity(EmployeeDTO employeeDTO){
            Employee employee = mapper.map(employeeDTO, Employee.class);
            return employee;
        }


        // convert Entity into DTO
        private EmployeeDTO mapToDTO(Employee employee){
            EmployeeDTO employeeDTO = mapper.map(employee, EmployeeDTO.class);
            return employeeDTO;
        }



}
