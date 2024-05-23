package com.example.demo.mapper;

import com.example.demo.domain.Customer;
import com.example.demo.dto.MenuDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MenuMapper {
    List<MenuDTO> getAllMenu();
    Integer deleteMenu(String menu_obj_id);
    Integer updateMenu(MenuDTO menudto);
    Integer insertMenu(MenuDTO menudto);
    String getLastMenu();
    Integer updateMenuOrderUp(String menu_obj_id);
    Integer updateMenuOrderDown(String menu_obj_id);
    List<MenuDTO> getSubMenuList(String parent_menu_obj_id);
}
