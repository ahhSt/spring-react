package com.example.demo.mapper;

import com.example.demo.domain.Customer;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CustomerMapper {
    public List<Customer> listCustomer();
}
