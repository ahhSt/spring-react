INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(1, 'mkyong','111@yahoo.com', TO_DATE('2017-02-11', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(2, 'yflow','222@yahoo.com', TO_DATE('2017-02-12', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(3, 'zilap','333@yahoo.com', TO_DATE('2017-02-13', 'yyyy-mm-dd'));

INSERT INTO data_type (data_type_id, type) VALUES ('3', null);
INSERT INTO data_type (data_type_id, type) VALUES ('6', null);
INSERT INTO data_type (data_type_id, type) VALUES ('1', null);
INSERT INTO data_type (data_type_id, type) VALUES ('2', null);
INSERT INTO data_type (data_type_id, type) VALUES ('4', null);
INSERT INTO data_type (data_type_id, type) VALUES ('5', null);
INSERT INTO data_type (data_type_id, type) VALUES ('7', null);
INSERT INTO data_type (data_type_id, type) VALUES ('8', null);
INSERT INTO data_type (data_type_id, type) VALUES ('9', null);
INSERT INTO data_type (data_type_id, type) VALUES ('10', null);
INSERT INTO data_type (data_type_id, type) VALUES ('11', null);
INSERT INTO data_type (data_type_id, type) VALUES ('12', null);
INSERT INTO data_type (data_type_id, type) VALUES ('13', null);

INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('3', '3', '3', '3', '3', '3', '3');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('6', '6', '6', '6', '6', '6', '6');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('1', '1', '1', '1', '1', '1', '1');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('2', '2', '2', '2', '2', '2', '2');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('4', '4', '4', '4', '4', '4', '4');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('5', '5', '5', '5', '5', '5', '5');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('7', '7', '7', '7', '7', '7', '7');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('8', '8', '8', '8', '8', '8', '8');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('9', '9', '9', '9', '9', '9', '9');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('10', '10', '10', '10', '10', '10', '10');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('11', '11', '11', '11', '11', '11', '11');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('12', '12', '12', '12', '12', '12', '12');
INSERT INTO domain (domain_id, description, eng_init_name, eng_name, kor_name, length, data_type_id) VALUES ('13', '13', '13', '13', '13', '13', '13');

INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES ('1', null, null, 'z', 'ㅋ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES ('2', null, null, 'b', 'ㅠ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES ('3', null, null, 'c', 'ㅊ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES ('4', null, null, 'd', 'ㅇ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES ('5', null, null, 'e', 'ㄷ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES ('6', null, null, 'f', 'ㄹ');
INSERT INTO word (word_id, description, eng_init_name, eng_name, kor_name) VALUES ('7', null, null, 'a', 'ㄹ');

INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES ('1', null, null, 'zz', 'ㅋㅋ', '5');
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES ('3', null, null, 'mm', 'ㅡㅡ', '3');
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES ('5', null, null, 'ii', 'ㅑㅑ', '1');
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES ('4', null, null, 'nn', 'ㅜㅜ', '3');
INSERT INTO term (term_id, description, eng_init_name, eng_name, kor_name, domain_id) VALUES ('2', null, null, 'yy', 'ㅛㅛ', '4');

INSERT INTO term_word (id, term_id, word_id) VALUES (1, '1', '5');
INSERT INTO term_word (id, term_id, word_id) VALUES (2, '5', '2');
INSERT INTO term_word (id, term_id, word_id) VALUES (3, '5', '6');
INSERT INTO term_word (id, term_id, word_id) VALUES (4, '5', '3');
INSERT INTO term_word (id, term_id, word_id) VALUES (5, '2', '1');