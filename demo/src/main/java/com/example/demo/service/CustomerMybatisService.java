package com.example.demo.service;

import com.example.demo.domain.Customer;
import com.example.demo.mapper.CustomerMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.List;

@Slf4j
@Service
public class CustomerMybatisService {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    @Autowired
    CustomerMapper customerMapper;

    @Transactional(readOnly = true)
    public List<Customer> listCusomter_mybatis() throws Exception{

        List<Customer> list = (List<Customer>) customerMapper.listCustomer();
        log.info(list.toString());
        return list;
    }

    @Transactional(readOnly = true)
    public Customer getCustomer_mybatis(Long id) throws Exception{
        Customer customer = customerMapper.getCustomer(id);
        return customer;
    }

    public int create_mybatis(Customer customer) {
        return customerMapper.createCustomer(customer);
    }

    public int update_mybatis(Customer customer) {
        return customerMapper.updateCustomer(customer);
    }

    public int delete_mybatis(Long id) {
        return customerMapper.deleteCustomer(id);
    }

}
