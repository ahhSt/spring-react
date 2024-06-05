package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.mapper.UserMapper;
import com.example.demo.pagination.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    public List<UserDTO> getAllUser(Map<String, Object> map) {
        return userMapper.getAllUser(map);
    }
    public PagingResponse<UserDTO> getAllUserPaging(SearchDTO dto) {
        // 조건에 해당하는 데이터가 없는 경우, 응답 데이터에 비어있는 리스트와 null을 담아 반환
        int count = userMapper.getCount(dto);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        // Pagination 객체를 생성해서 페이지 정보 계산 후 SearchDto 타입의 객체인 params에 계산된 페이지 정보 저장
        Pagination pagination = new Pagination(count, dto);
        dto.setPagination(pagination);

        // 계산된 페이지 정보의 일부(limitStart, recordSize)를 기준으로 리스트 데이터 조회 후 응답 데이터 반환
        List<UserDTO> list = userMapper.getAllUserPaging(dto);
        return new PagingResponse<>(list, pagination);
    }

    public Integer deleteUser(String usrId){
        return userMapper.deleteUser(usrId);
    }

    public Integer insertUser(UserDTO userdto){
        return userMapper.insertUser(userdto);
    }

    public Integer updateUser(UserDTO userdto){
        return userMapper.updateUser(userdto);
    }

}
