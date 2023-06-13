package com.example.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/gap")
public class GapAnalysisController {
    
    @GetMapping("/metadata")
    private void getMetaData() {
        

        String url = "jdbc:postgresql://172.20.30.177:5432/bart_db";
        String id = "afc_main";
        String password = "afc_main!234";
        try {
            // Class.forName("oracle.jdbc.driver.OracleDriver" ); 
            Class.forName("org.postgresql.Driver" ); 
            Connection con = DriverManager.getConnection(url, id, password);

            String query = """
                    SELECT table_name, 
                        column_name, 
                        data_type, 
                        character_maximum_length, 
                        numeric_precision, 
                        numeric_scale, 
                        datetime_precision, 
                        udt_name
                    FROM INFORMATION_SCHEMA.COLUMNS
                    WHERE TABLE_CATALOG = 'bart_db'
                    and table_schema = 'afc_main'
                    ORDER BY ORDINAL_POSITION
                    """;
            PreparedStatement pstmt = con.prepareStatement(query);

            ResultSet rs = pstmt.executeQuery();

            while(rs.next()){
                String column_name = rs.getString("column_name");
                String table_name = rs.getString("table_name");
                String data_type = rs.getString("data_type");

                System.out.println(column_name + " : " + table_name + " : " + data_type);

            }

        } catch (SQLException | ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
}
