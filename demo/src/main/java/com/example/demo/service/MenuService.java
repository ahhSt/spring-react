package com.example.demo.service;

import com.example.demo.dto.MenuDTO;
import com.example.demo.mapper.MenuMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MenuService {
    private final MenuMapper menuMapper;

    public List<MenuDTO> getAllMenu(){
        return menuMapper.getAllMenu();
    }

    public Integer deleteMenu(String menu_obj_id){
        return menuMapper.deleteMenu(menu_obj_id);
    }

    public Integer updateMenu(MenuDTO menudto){
        return menuMapper.updateMenu(menudto);
    }

    public Integer updateMenuOrderUp(String menu_obj_id){
        return menuMapper.updateMenuOrderUp(menu_obj_id);
    }

    public Integer updateMenuOrderDown(String menu_obj_id){
        return menuMapper.updateMenuOrderDown(menu_obj_id);
    }

    public Integer insertMenu(MenuDTO menudto){
        return menuMapper.insertMenu(menudto);
    }

    public String getLastMenu(){
        return menuMapper.getLastMenu();
    }

    public List<MenuDTO> getSubMenuList(String parent_menu_obj_id){
        return menuMapper.getSubMenuList(parent_menu_obj_id);
    }
}
