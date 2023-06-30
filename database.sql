-- CREATE DATABASE todo_db;

CREATE TABLE IF NOT EXISTS task_entries(entry_id SERIAL PRIMARY KEY,title VARCHAR(255),description VARCHAR(255),status VARCHAR(255),date DATE, user_id INT);

CREATE TABLE IF NOT EXISTS task_users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE
);

