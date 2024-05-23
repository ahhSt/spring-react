package com.example.demo.controller;

import com.example.demo.dto.MenuDTO;
import com.example.demo.service.MenuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MenuController {
    private final MenuService menuService;

    @GetMapping("/menulist")
    public ResponseEntity<List<MenuDTO>> menuList(){
        try {
            List<MenuDTO> menuListResult = menuService.getAllMenu();
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
            ResponseEntity<List<MenuDTO>> response =  new ResponseEntity<>(menuListResult, header, HttpStatus.OK);
            return response;
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/deleteMenu")
    public void deleteMenu(MenuDTO deleteMenu){
        //menu_order 조정
        List<MenuDTO> subMenuList = menuService.getSubMenuList(deleteMenu.getParent_menu_obj_id());
        for( MenuDTO menu : subMenuList ){
            if(menu.getMenu_order() > deleteMenu.getMenu_order()){
                menuService.updateMenuOrderDown(menu.getMenu_obj_id());
            }
        }
        menuService.deleteMenu(deleteMenu.getMenu_obj_id());
    }

    @GetMapping("/updateMenu")
    public void updateMenu(MenuDTO menu){
        menuService.updateMenu(menu);
    }

    @GetMapping("/insertMenu")
    public void insertMenu(MenuDTO newMenu) {
        //lastID
        int newMenuID = Integer.parseInt(menuService.getLastMenu()) + 1;
        newMenu.setMenu_obj_id(String.format("%03d", newMenuID));

        //menu_order 조정
        List<MenuDTO> subMenuList = menuService.getSubMenuList(newMenu.getParent_menu_obj_id());
        for( MenuDTO menu : subMenuList ){
            if(menu.getMenu_order() >= newMenu.getMenu_order()){
                menuService.updateMenuOrderUp(menu.getMenu_obj_id());
            }
        }
        menuService.insertMenu(newMenu);
    }

}
