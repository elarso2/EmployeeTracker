DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE DATABASE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY role_id
    REFERENCES roles(id)
    ON DELETE SET NULL
)