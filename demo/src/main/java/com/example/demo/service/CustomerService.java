package com.example.demo.service;

import com.example.demo.domain.Customer;
import com.example.demo.mapper.CustomerMapper;
import com.example.demo.repository.CustomerRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomerService {
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    CustomerMapper customerMapper;

    private final EntityManager em;

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

    @Transactional(readOnly = true)
    public long getMaxId() {
        long test;
        List testList = em.createQuery("select max(id) from Customer").getResultList();
        log.info(testList.toString());
        Object testObj = testList.get(0);
        if (testObj == null)
            test = 0;
        else
            test = (Long) testObj;
        return test;
    }

}
