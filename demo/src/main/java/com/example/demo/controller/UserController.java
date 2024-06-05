package com.example.demo.controller;

import com.example.demo.dto.UserDTO;
import com.example.demo.pagination.PagingResponse;
import com.example.demo.pagination.SearchDTO;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping("/userList")
    public ResponseEntity<List<UserDTO>> userList(
                                            @RequestParam(required = false, defaultValue = "1") Integer page,
                                            @RequestParam(required = false, defaultValue = "") String userId
                                            ){
        try {
            HashMap<String, Object> map = new HashMap<>();
            map.put("page", (page-1)*10);
            map.put("userId", userId);

            List<UserDTO> userListResult = userService.getAllUser(map);
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
            return new ResponseEntity<>(userListResult, header, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/userListPaging")
    public ResponseEntity<PagingResponse<UserDTO>> userListPaging(
                                            @RequestParam(required = false, defaultValue = "1") Integer page,
                                            @RequestParam(required = false, defaultValue = "") String userId
                                            ){
        try {
            SearchDTO searchDTO = new SearchDTO(page,userId);
            PagingResponse<UserDTO> userListResult = userService.getAllUserPaging(searchDTO);
            HttpHeaders header = new HttpHeaders();
            header.setContentType(new MediaType("application", "json", StandardCharsets.UTF_8));
            return new ResponseEntity<>(userListResult, header, HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @DeleteMapping("/userDelete/{usrId}")
    public void userDelete(@PathVariable("usrId") String usrId){
        userService.deleteUser(usrId);
    }

    @PostMapping("/userInsert")
    public void userInsert(@RequestBody UserDTO userDTO){
        userService.insertUser(userDTO);
    }

    @PostMapping("/userUpdate")
    public void userUpdate(@RequestBody UserDTO userDTO){
        userService.updateUser(userDTO);
    }



}
