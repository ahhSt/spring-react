INSERT INTO customer (id, address, city, country, created_date, email, "name", state, zipcode) VALUES(nextval('customer_seq'), '1714 Franklin St.', 'Oakland', 'US', '2024-03-22 16:54:33.258', 'Sonny@straffic.com', 'Sonny', 'CA', '94612');
INSERT INTO customer (id, address, city, country, created_date, email, "name", state, zipcode) VALUES(nextval('customer_seq'), '25436 Custom Dr.', 'Hayward', 'US', '2024-03-22 16:54:33.258', 'Sam@straffic.com', 'Sam', 'CA', '94544');
INSERT INTO customer (id, address, city, country, created_date, email, "name", state, zipcode) VALUES(nextval('customer_seq'), '22271 Foothill Blvd.', 'Hayward', 'US', '2024-03-22 16:54:33.258', 'Kyle@straffic.com', 'Kyle', 'CA', '94541');
INSERT INTO customer (id, address, city, country, created_date, email, "name", state, zipcode) VALUES(nextval('customer_seq'), '24137 Mission Blvd.', 'Hayward', 'US', '2024-03-22 16:54:33.258', 'John@straffic.com', 'John', 'CA', '94544');

-- 'password'
INSERT INTO users (id, username, "password", role) VALUES(1, 'user', '$2y$10$T9xpSbwtxlubwKMbI6l86uwdOtyBZqHoNa5TjwWkADOX1tWAMc4sK', 'USER');
INSERT INTO users (id, username, "password", role) VALUES(2, 'admin', '$2y$10$T9xpSbwtxlubwKMbI6l86uwdOtyBZqHoNa5TjwWkADOX1tWAMc4sK', 'ADMIN');