package com.example.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.MetaData;
import com.example.demo.dto.DbmsDto;
import com.example.demo.dto.TermDto;
import com.example.demo.service.GapAnalysisService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gap")
public class GapAnalysisController {

    @Autowired
    private GapAnalysisService gapAnalysisService;
    
    @PostMapping("/metadata")
    private void collectMetaData(@RequestBody DbmsDto dbmsDto) throws Exception {

        log.info(dbmsDto.toString());
        System.out.println("dbmsDto : " + dbmsDto.getHost());
        
        List<MetaData> targetData = gapAnalysisService.getTargetDbMetaData(dbmsDto);
        if(!targetData.isEmpty()) {
            gapAnalysisService.insertMetaData(targetData, dbmsDto);
        }

    }
}
