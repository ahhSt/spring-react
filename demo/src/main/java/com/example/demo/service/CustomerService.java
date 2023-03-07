package com.example.demo.service;

import com.example.demo.domain.Customer;
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

    @Transactional(readOnly = true)
    public List<Customer> listCustomer() throws Exception {

//        System.out.println("\n1.findAll()...");
//        for (Customer customer : customerRepository.findAll()) {
//            System.out.println(customer);
//        }
//
//        System.out.println("\n2.findByEmail(String email)...");
//        for (Customer customer : customerRepository.findByEmail("222@yahoo.com")) {
//            System.out.println(customer);
//        }
//
//        System.out.println("\n3.findByDate(Date date)...");
//        for (Customer customer : customerRepository.findByDate(sdf.parse("2017-02-12"))) {
//            System.out.println(customer);
//        }
//
//        // For Stream, need @Transactional
//        System.out.println("\n4.findByEmailReturnStream(@Param(\"email\") String email)...");
//        try (Stream<Customer> stream = customerRepository.findByEmailReturnStream("333@yahoo.com")) {
//            stream.forEach(x -> System.out.println(x));
//        }
//
//        System.out.println("Done!");

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
