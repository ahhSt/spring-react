package com.example.demo.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import static io.swagger.v3.oas.annotations.media.Schema.AccessMode.READ_ONLY;

@Getter
@Setter
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_seq")
    @SequenceGenerator(sequenceName = "customer_seq", allocationSize = 1, name = "customer_seq")
    @Schema(description = "Customer ID",  example = "0")
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @Schema(description = "Customer Name",  example = "Test User")
    private String name;

    @Schema(description = "Customer Email",  example = "test@starffic.co.kr")
    private String email;

    @Schema(description = "Customer Address",  example = "test Address")
    private String address;

    @Column(name = "CREATED_DATE")
    @Schema(description = "Reg Date",  example = "2023-02-24")
    private Date date;

    @Column
    private String city;
    @Column
    private String state;
    @Column
    private String zipcode;
    @Column
    private String country;

}
