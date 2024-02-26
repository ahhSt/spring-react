package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DbmsDto {
  private String dbname;
  private String host;
  private String port;
  private String schema;
  private String user;
  private String password;
  private String dbmsType;
}
