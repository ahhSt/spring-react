package com.example.demo.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.domain.MetaData;
import com.example.demo.domain.MetaTarget;
import com.example.demo.dto.DbmsDto;
import com.example.demo.repository.MetaDataRepository;
import com.example.demo.repository.MetaTargetRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class GapAnalysisService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private MetaTargetRepository metaTargetRepository;
    @Autowired
    private MetaDataRepository metaDataRepository;

    @Transactional(readOnly = true)
    public List<MetaData> getTargetDbMetaData(DbmsDto dbmsDto) throws Exception{
      
        String dbname = dbmsDto.getDbname();
        String user = dbmsDto.getUser();
        String schema = dbmsDto.getSchema();
        String password = dbmsDto.getPassword();
        String dbmsType = dbmsDto.getDbmsType();
        String conn_url = dbmsDto.getHost();

        List<MetaData> metaTargetData = new ArrayList<MetaData>();

        PreparedStatement pstmt = null;

        try {
            // Class.forName("oracle.jdbc.driver.OracleDriver" ); 
            Class.forName("org.postgresql.Driver" ); 
            Connection con = DriverManager.getConnection(conn_url, user, password);

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
                    WHERE TABLE_CATALOG = ?
                    and table_schema = ?
                    ORDER BY ORDINAL_POSITION
                    """;
            pstmt = con.prepareStatement(query);
            pstmt.setString(1, dbname);
            pstmt.setString(2, schema);

            ResultSet rs = pstmt.executeQuery();

            while(rs.next()){
                String column_name = rs.getString("column_name");
                String table_name = rs.getString("table_name");
                String data_type = rs.getString("data_type");
                int length = rs.getInt("character_maximum_length");
                int numeric_precision = rs.getInt("numeric_precision");
                int numeric_scale = rs.getInt("numeric_scale");
                int datetime_precision = rs.getInt("datetime_precision");
                String udt_name = rs.getString("udt_name");

                MetaData metaData = new MetaData();

                metaData.setTable_name(table_name);
                metaData.setColumn_name(column_name);
                metaData.setData_type(data_type);
                metaData.setCharacter_maximum_length(length);
                metaData.setNumeric_precision(numeric_precision);
                metaData.setNumeric_scale(numeric_scale);
                metaData.setDatetime_precision(datetime_precision);
                metaData.setUdt_name(udt_name);

                metaTargetData.add(metaData);
            }
        } catch (SQLException | ClassNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            // Close database resources
            try {
                if (pstmt != null) {
                    pstmt.close();
                }
            } catch (SQLException e) {
                System.out.println("Cleanup failed to close Statement.");
            }
        }

        return metaTargetData;
    }
  
    public void insertMetaData(List<MetaData> metaTargetData, DbmsDto dbmsDto) throws Exception{

        String dbname = dbmsDto.getDbname();
        String user = dbmsDto.getUser();
        String schema = dbmsDto.getSchema();
        String password = dbmsDto.getPassword();
        String dbmsType = dbmsDto.getDbmsType();
        String conn_url = dbmsDto.getHost();

        MetaTarget metaTarget = new MetaTarget();

        List<MetaTarget> result = metaTargetRepository.search(dbmsDto);

        if(!result.isEmpty()){
            String deleteSql = """
                      DELETE FROM meta_data WHERE meta_id = ?
                  """;

            int update = jdbcTemplate.update(deleteSql, result.get(0).getId());

            deleteSql = """
                      DELETE FROM meta_target WHERE meta_id = ?
                  """;

            update = jdbcTemplate.update(deleteSql, result.get(0).getId());

            // metaTarget.setId(result.get(0).getId());
            // metaTargetRepository.delete(metaTarget);
        }  

        metaTarget.setDb_name(dbname);
        metaTarget.setSchema(schema);
        metaTarget.setUser(user);

        metaTarget = metaTargetRepository.insert(metaTarget);

        String sql = """
            insert into meta_data(
                meta_id,
                table_name,          
                column_name,                     
                data_type,
                length, 
                numeric_precision, 
                numeric_scale, 
                datetime_precision, 
                udt_name) 
                values(
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?,
                    ?)
            """;

        // int colIdx = 0;
        // AtomicInteger colIdx = new AtomicInteger(1);

        Long meta_id = metaTarget.getId();
        jdbcTemplate.batchUpdate(
            sql,
            metaTargetData,
            1000,
            (PreparedStatement ps, MetaData item ) -> {
                ps.setLong(1, meta_id);
                ps.setString(2, item.getTable_name());
                ps.setString(3, item.getColumn_name());
                ps.setString(4, item.getData_type());
                ps.setInt(5, item.getCharacter_maximum_length());
                ps.setInt(6, item.getNumeric_precision());
                ps.setInt(7, item.getNumeric_scale());
                ps.setInt(8, item.getDatetime_precision());
                ps.setString(9, item.getUdt_name());
            }
        );
    }
}
