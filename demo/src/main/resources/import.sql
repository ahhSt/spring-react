INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(1, 'Sonny','Sonny@Straffic.com', TO_DATE('2024-02-11', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(2, 'Sam','Sam@Straffic.com', TO_DATE('2024-02-12', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(3, 'Kyle','Kyle@Straffic.com', TO_DATE('2024-02-13', 'yyyy-mm-dd'));
INSERT INTO customer (ID, NAME, EMAIL, CREATED_DATE) VALUES(4, 'John','John@Straffic.com', TO_DATE('2024-02-13', 'yyyy-mm-dd'));

INSERT INTO users (id, username, "password", role) VALUES(1, 'user', '$2y$10$T9xpSbwtxlubwKMbI6l86uwdOtyBZqHoNa5TjwWkADOX1tWAMc4sK', 'USER');
INSERT INTO users (id, username, "password", role) VALUES(2, 'admin', '$2y$10$T9xpSbwtxlubwKMbI6l86uwdOtyBZqHoNa5TjwWkADOX1tWAMc4sK', 'ADMIN');

--INSERT INTO users (username, email, "password") VALUES('user', true, '$2y$10$T9xpSbwtxlubwKMbI6l86uwdOtyBZqHoNa5TjwWkADOX1tWAMc4sK');
--INSERT INTO users (username, email, "password") VALUES('admin', true, '$2y$10$T9xpSbwtxlubwKMbI6l86uwdOtyBZqHoNa5TjwWkADOX1tWAMc4sK');