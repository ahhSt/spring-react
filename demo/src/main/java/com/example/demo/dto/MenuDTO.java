package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class MenuDTO {
    String menu_obj_id;
    String parent_menu_obj_id;
    String menu_nm;
    String important_flg;
    int menu_order;

    String obj_yn;
    String menu_path;
    String menu_desc;
    String use_yn;
    String reg_dtime;

    String reg_usr_id;
    String upd_dtime;
    String upd_usr_id;

}
