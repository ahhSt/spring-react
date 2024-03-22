package com.example.demo.controller;

import com.example.demo.domain.Customer;
import com.example.demo.service.CustomerMybatisService;
import com.example.demo.service.CustomerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.Date;
import java.util.List;

@Tag(name = "(SAMPLE) Customer Mybatis Controller")
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/mybatis/customer")
@Slf4j
public class CustomerMybatisController {

    @Autowired
    CustomerService customerService;

    @Autowired
    CustomerMybatisService customerMybatisService;

    @Operation(summary = "(샘플)고객 정보 목록 Mybatis", description = "이 api는 샘플용 API입니다. 회원 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("")
    public ResponseEntity<List<Customer>> customer_mybatis() throws Exception {

        try {
            List<Customer> result = customerMybatisService.listCusomter_mybatis();
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
            ResponseEntity<List<Customer>> response =  new ResponseEntity<>(result, header, HttpStatus.OK);
            return response;
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

    @Operation(summary = "(샘플)고객 정보 상세", description = "이 api는 샘플용 API입니다. 회원 상세정보를 조회합니다. path 값과 추가 파라미터에 대한 표현입니다.")
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer_mybatis(@Parameter(description = "검색하려는 Customer ID 입니다.") @PathVariable Long id)
            throws Exception {

        try {
            Customer result = customerMybatisService.getCustomer_mybatis(id);
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
            ResponseEntity<Customer> response =  new ResponseEntity<>(result, header, HttpStatus.OK);
            return response;
        }
        catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

    @Operation(summary = "(샘플)고객 정보 입력", description = "고객 정보를 입력합니다.")
    @PostMapping("")
    public void createCustomer_mybatis(@RequestBody Customer request){
        Customer customer = new Customer();

        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setZipcode(request.getZipcode());
        customer.setCountry(request.getCountry());
        customer.setDate(new Date());

        int rtn = customerMybatisService.create_mybatis(customer);
        log.info(String.valueOf(rtn));
    }

    @Operation(summary = "(샘플)고객 정보 수정", description = "고객 정보를 수정합니다.")
    @PutMapping("/{id}")
    public void updateCustomer_mybatis(
            @Parameter(description = "수정하려는 Customer ID 입니다.")
            @PathVariable
            Long id,
            @RequestBody
            Customer request){
        Customer customer = new Customer();
        customer.setId(id);
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setAddress(request.getAddress());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setZipcode(request.getZipcode());
        customer.setCountry(request.getCountry());
        customer.setDate(new Date());

        int rtn = customerMybatisService.update_mybatis(customer);
        log.info(String.valueOf(rtn));
    }

    @Operation(summary = "(샘플)고객 정보 삭제", description = "고객 정보를 삭제합니다.")
    @DeleteMapping("/{id}")
    public void deleteCustomer_mybatis(
            @Parameter(description = "삭제하려는 Customer ID 입니다.")
            @PathVariable
            Long id){

        int rtn = customerMybatisService.delete_mybatis(id);
        log.info(String.valueOf(rtn));
    }
}
