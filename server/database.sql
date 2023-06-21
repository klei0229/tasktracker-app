CREATE DATABASE todo_db;

CREATE TABLE entries(entry_id SERIAL PRIMARY KEY,title VARCHAR(255),description VARCHAR(255),status VARCHAR(255),date DATE, user_id INT);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

