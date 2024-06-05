package com.example.demo.mapper;

import com.example.demo.dto.UserDTO;
import com.example.demo.pagination.SearchDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.Map;
import java.util.List;

@Mapper
public interface UserMapper {
    List<UserDTO> getAllUser(Map<String, Object> map);
    List<UserDTO> getAllUserPaging(SearchDTO dto);
    Integer getCount(SearchDTO dto);

    Integer deleteUser(String usr_id);
    Integer insertUser(UserDTO userdto);
    Integer updateUser(UserDTO userdto);
}
