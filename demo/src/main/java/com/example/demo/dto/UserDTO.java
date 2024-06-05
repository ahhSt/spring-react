package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class UserDTO {
    String usr_id;
    String usr_nm;
    String use_yn;
    String reg_dtime;
    String reg_usr_id;
    String upd_dtime;
    String upd_usr_id;
}