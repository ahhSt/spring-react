package com.example.demo.service;

import com.example.demo.domain.Customer;
import com.example.demo.mapper.CustomerMapper;
import com.example.demo.repository.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class CustomerService {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerMapper customerMapper;

    @Transactional(readOnly = true)
    public List<Customer> listCustomer() throws Exception {

        List<Customer> list = (List<Customer>) customerRepository.findAll();
        log.info(list.toString());

        return list;
    }

    public Optional<Customer> getCustomer(Long id) throws Exception {
        return customerRepository.findById(id);
    }

    public int create(Customer customer) {
        Customer rtn = customerRepository.save(customer);
        log.info(rtn.toString());
        return 0;
    }

    public int update(Customer customer) {
        Customer rtn = customerRepository.save(customer);
        log.info(rtn.toString());
        return 0;
    }

    public int delete(Long id) {
        customerRepository.deleteById(id);
        return 0;
    }
}
