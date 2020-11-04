DROP DATABASE IF EXISTS user_db

CREATE DATABASE user_db;
USE user_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
	password varchar(20) NOT NULL
);
