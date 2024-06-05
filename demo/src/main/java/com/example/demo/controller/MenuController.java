package com.example.demo.controller;

import com.example.demo.dto.MenuDTO;
import com.example.demo.service.MenuService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MenuController {
    private final MenuService menuService;

    @GetMapping("/menuList")
    public ResponseEntity<List<MenuDTO>> menuList(){
        try {
            List<MenuDTO> menuListResult = menuService.getAllMenu();
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
            return new ResponseEntity<>(menuListResult, header, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/deleteMenu")
    public void deleteMenu(@RequestBody MenuDTO deleteMenu){
        //menu_order 조정
        List<MenuDTO> subMenuList = menuService.getSubMenuList(deleteMenu.getParent_menu_obj_id());
        for( MenuDTO menu : subMenuList ){
            if(menu.getMenu_order() > deleteMenu.getMenu_order()){
                menuService.updateMenuOrderDown(menu.getMenu_obj_id());
            }
        }
        menuService.deleteMenu(deleteMenu.getMenu_obj_id());
    }

    @PostMapping("/updateMenu")
    public void updateMenu(@RequestBody String jsonMenu){
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(jsonMenu);
            MenuDTO newMenu = mapper.readValue(jsonNode.get("jsonMenu").asText(), MenuDTO.class);
            menuService.updateMenu(newMenu);
        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @PostMapping("/insertMenu")
    public void insertMenu(@RequestBody String jsonMenu) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(jsonMenu);
            MenuDTO newMenu = mapper.readValue(jsonNode.get("jsonMenu").asText(), MenuDTO.class);

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
        } catch (Exception e){
            e.printStackTrace();
        }
    }

}
