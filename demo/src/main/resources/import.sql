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


INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES (14, null, 'NUM', 'Number', '번호', '10', 1);
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES (15, null, 'DT', 'Date', '날짜', '8', 2);
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES (16, null, 'DTTM', 'DateTime', '일시', '14', 3);

INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (1, null, null, 'z', 'ㅋ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (2, null, null, 'b', 'ㅠ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (3, null, null, 'c', 'ㅊ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (4, null, null, 'd', 'ㅇ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (5, null, null, 'e', 'ㄷ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (6, null, null, 'f', 'ㄹ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (7, null, null, 'a', 'ㄹ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (8, null, 'CRD', 'Card', '카드');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (9, null, 'NUM', 'Number', '번호');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (10, null, 'SRL', 'Serial', '시리얼');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (11, null, 'REG', 'Registry', '등록');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES (12, null, 'UPD', 'Update', '수정');

INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES (1, null, null, 'zz', 'ㅋㅋ', 14);
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES (3, null, null, 'mm', 'ㅡㅡ', 15);
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES (5, null, null, 'ii', 'ㅑㅑ', 16);
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES (4, null, null, 'nn', 'ㅜㅜ', 14);
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES (2, null, null, 'yy', 'ㅛㅛ', 15);

SELECT NEXTVAL('term_seq');
SELECT NEXTVAL('term_seq');
SELECT NEXTVAL('term_seq');
SELECT NEXTVAL('term_seq');
SELECT NEXTVAL('term_seq');