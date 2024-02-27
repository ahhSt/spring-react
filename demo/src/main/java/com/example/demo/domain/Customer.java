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
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUST_SEQ")
    @SequenceGenerator(sequenceName = "customer_seq", allocationSize = 1, name = "CUST_SEQ")
    @Schema(description = "Customer ID",  example = "0")
//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    Long id;

    @Schema(description = "Customer Name",  example = "Test User")
    String name;

    @Schema(description = "Customer Email",  example = "test@starffic.co.kr")
    String email;

    @Schema(description = "Customer Address",  example = "test Address")
    String address;

    @Column(name = "CREATED_DATE")
    @Schema(description = "Reg Date",  example = "2023-02-24")
    Date date;
}
