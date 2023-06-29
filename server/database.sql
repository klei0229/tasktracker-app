-- CREATE DATABASE todo_db;

CREATE TABLE task_entries IF NOT EXISTS(entry_id SERIAL PRIMARY KEY,title VARCHAR(255),description VARCHAR(255),status VARCHAR(255),date DATE, user_id INT);

CREATE TABLE task_users IF NOT EXISTS(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

