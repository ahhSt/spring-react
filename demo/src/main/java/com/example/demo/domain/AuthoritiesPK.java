package com.example.demo.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class AuthoritiesPK implements Serializable {
    private String username;
    private String authority;
}
