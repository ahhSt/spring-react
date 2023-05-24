INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(1, 'mkyong','111@yahoo.com', TO_DATE('2017-02-11', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(2, 'yflow','222@yahoo.com', TO_DATE('2017-02-12', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(3, 'zilap','333@yahoo.com', TO_DATE('2017-02-13', 'yyyy-mm-dd'));

INSERT INTO data_type (data_type_id, type) VALUES (3, 'VARCHAR');
INSERT INTO data_type (data_type_id, type) VALUES (6, 'TIMESTAMP');
INSERT INTO data_type (data_type_id, type) VALUES (1, 'INTEGER');
INSERT INTO data_type (data_type_id, type) VALUES (2, 'STRING');
INSERT INTO data_type (data_type_id, type) VALUES (4, null);
INSERT INTO data_type (data_type_id, type) VALUES (5, null);
INSERT INTO data_type (data_type_id, type) VALUES (7, null);
INSERT INTO data_type (data_type_id, type) VALUES (8, null);
INSERT INTO data_type (data_type_id, type) VALUES (9, null);
INSERT INTO data_type (data_type_id, type) VALUES (10, 'VARCHAR');
INSERT INTO data_type (data_type_id, type) VALUES (11, 'TIMESTAMP');
INSERT INTO data_type (data_type_id, type) VALUES (12, 'INTEGER');
INSERT INTO data_type (data_type_id, type) VALUES (13, 'STRING');

INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES(1, NULL, 'NUM', 'Number', '번호', '10', 1);
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES(2, NULL, 'DT', 'Date', '날짜', '8', 2);
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES(3, NULL, 'DTTM', 'DateTime', '일시', '14', 3);
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES(4, '날짜와 시분초', 'DTIME', 'Datetime', '일시', '14', 6);
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES(5, '식별자', 'ID', 'Identity', '아이디', '3', 2);
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES(6, '숫자형 식별자', 'ID', 'identity', '아이디', '5', 1);

INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(1, NULL, 'CRD', 'Card', '카드');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(2, NULL, 'NUM', 'Number', '번호');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(3, NULL, 'SRL', 'Serial', '시리얼');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(4, NULL, 'REG', 'Registry', '등록');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(5, NULL, 'UPD', 'Update', '수정');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(6, 'Date and time that the transaction occurred.', 'TRXN', 'Transaction', '거래');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(7, 'WMATA Mezzanine', 'MEZZ', 'mezzanine', '메자닌');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(8, '장비', 'EQMT', 'Equipment', '장비');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES(9, '형태별 분류', 'TYPE', 'Type', '형태');

INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES(1, '카드 고유 번호', 'CRD_NUM', 'Card_Number', '카드_번호', 1);
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES(2, '카드 등록 일시', 'CRD_REG_DTTM', 'Card_Registry_DateTime', '카드_등록_일시', 3);
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES(3, 'WMATA Mezzanine ID', 'MEZZ_ID', 'mezzanine_Identity', '메자닌_아이디', 5);
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES(4, 'WMATA 장비 유형 ID', 'EQMT_TYPE_ID', 'Equipment_Type_Identity', '장비_형태_아이디', 5);
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES(5, 'Serial 번호', 'SRL_NUM', 'Serial_Number', '시리얼_번호', 1);

-- term 갯수만큼 처음에 시컨스를 자동생성해야한다.
select NEXTVAL('term_seq');
select NEXTVAL('term_seq');
select NEXTVAL('term_seq');
select NEXTVAL('term_seq');
select NEXTVAL('term_seq');


INSERT INTO term_word (id, term_id, word_id) VALUES(1, 1, 1); 
INSERT INTO term_word (id, term_id, word_id) VALUES(2, 2, 1); 
INSERT INTO term_word (id, term_id, word_id) VALUES(3, 2, 4); 
INSERT INTO term_word (id, term_id, word_id) VALUES(4, 3, 7); 
INSERT INTO term_word (id, term_id, word_id) VALUES(5, 4, 8); 
INSERT INTO term_word (id, term_id, word_id) VALUES(6, 4, 9); 
INSERT INTO term_word (id, term_id, word_id) VALUES(7, 5, 3);