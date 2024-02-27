package com.example.demo.controller;

import com.example.demo.domain.Customer;
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
import java.util.List;
import java.util.Optional;

@Tag(name = "(SAMPLE) Customer Controller")
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/customer")
@Slf4j
public class CustomerController {

//    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//    @Autowired
//    DataSource dataSource;

    @Autowired
    CustomerService customerService;

    @Operation(summary = "(샘플)고객 정보 목록 Mybatis", description = "이 api는 샘플용 API입니다. 회원 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/mybatis")
    public ResponseEntity<List<Customer>> customer_mybatis() throws Exception {

        try {
            List<Customer> result = customerService.listCusomter_mybatis();
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

    @Operation(summary = "(샘플)고객 정보 목록", description = "이 api는 샘플용 API입니다. 회원 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("")
    public ResponseEntity<List<Customer>> customer() throws Exception {

        try {
            List<Customer> result = customerService.listCustomer();
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
    public ResponseEntity<Optional<Customer>> customer(@Parameter(description = "검색하려는 Customer ID 입니다.") @PathVariable Long id,
                                                       @Parameter(description = "검색하려는 Customer Name 입니다.", example = "bde") @RequestParam(required = false) String name
                                                       ) throws Exception {

        log.info("Default Value : " + name);
        Optional<Customer> result = customerService.getCustomer(id);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        ResponseEntity<Optional<Customer>> response =  new ResponseEntity<>(result, header, HttpStatus.OK);
        return response;
    }

    @Operation(summary = "(샘플)example vs defaultValue", description = "defaultValue 와 example 의 차이를 보여주는 함수")
    @GetMapping("/sample/{id}")
    public ResponseEntity<Optional<Customer>> customer2(@Parameter(description = "검색하려는 Customer ID 입니다.")
                                                        @PathVariable
                                                        Long id,
                                                        @Parameter(description = "검색하려는 Customer Name 입니다.", example = "bde")
                                                        @RequestParam(defaultValue = "afc", required = false)
                                                        String name
    ) throws Exception {

        log.info("Default Value : " + name);
        Optional<Customer> result = customerService.getCustomer(id);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        ResponseEntity<Optional<Customer>> response =  new ResponseEntity<>(result, header, HttpStatus.OK);
        return response;
    }

    @Operation(summary = "(샘플)고객 정보 입력", description = "고객 정보를 입력합니다.")
    @PostMapping("")
    public void createCustomer(@RequestBody Customer request){
        Customer customer = new Customer();
        customer.setId(request.getId());
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setAddress(request.getAddress());

        int rtn = customerService.create(customer);
        log.info(String.valueOf(rtn));
    }

    @Operation(summary = "(샘플)고객 정보 수정", description = "고객 정보를 수정합니다.")
    @PutMapping("/{id}")
    public void updateCustomer(
            @Parameter(description = "수정하려는 Customer ID 입니다.")
            @PathVariable
            Long id,
            @RequestBody
            Customer request){
        Customer customer = new Customer();
        customer.setId(id);
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());

        int rtn = customerService.update(customer);
        log.info(String.valueOf(rtn));
    }

    @Operation(summary = "(샘플)고객 정보 삭제", description = "고객 정보를 삭제합니다.")
    @DeleteMapping("/{id}")
    public void updateCustomer(
            @Parameter(description = "삭제하려는 Customer ID 입니다.")
            @PathVariable
            Long id){

        int rtn = customerService.delete(id);
        log.info(String.valueOf(rtn));
    }

    @Operation(summary = "findMaxId", description = "Max ID")
    @GetMapping("/getMaxId")
    public long getWordMaxId() throws Exception{
        return customerService.getMaxId();
    }

}
