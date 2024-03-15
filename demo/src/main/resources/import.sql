INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(1, 'Sonny','Sonny@Straffic.com', TO_DATE('2024-02-11', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(2, 'Sam','Sam@Straffic.com', TO_DATE('2024-02-12', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(3, 'Kyle','Kyle@Straffic.com', TO_DATE('2024-02-13', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(4, 'John','John@Straffic.com', TO_DATE('2024-02-13', 'yyyy-mm-dd'));

INSERT INTO quality_tool (ID, serial_no,tool_maker,tool_model,tool_name,first_register,register_date, last_calibration_date, last_calibration_org)
    VALUES (1, '31350132WS', 'FLUKE', '17B+', 'DIGITAL MULTIMETER', '23280', TO_DATE('2024-03-14', 'yyyy-mm-dd'), TO_DATE('2024-03-14', 'yyyy-mm-dd'), '교정기술원(주)');
