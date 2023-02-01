DROP DATABASE IF EXISTS Employees_db;
CREATE DATABASE employees_db;
USE employees_db;

CREATE TABLE Department (
    id                  INT unsigned NOT NULL AUTO_INCREMENT,
    name                VARCHAR(30) UNIQUE NOT NULL,
    
    PRIMARY KEY         (id)
);

CREATE TABLE Role (
    id                  INT unsigned NOT NULL AUTO_INCREMENT,
    title               VARCHAR(30) UNIQUE NOT NULL,
    salary              DECIMAL(12,4) NOT NULL,
    department_id       INT unsigned,
    
    PRIMARY KEY         (id),
    FOREIGN KEY         (department_id) REFERENCES department(id)

);

CREATE TABLE Employee (
    id                  INT unsigned NOT NULL,               #AUTO_INCREMENT If not auto increment, use not_manager_of_self constraint
    first_name          VARCHAR(30) NOT NULL,
    last_name           VARCHAR(30) NOT NULL,
    role_id             INT unsigned NOT NULL,
    manager_id          INT unsigned,
    
    PRIMARY KEY         (id),
    FOREIGN KEY         (role_id) REFERENCES role(id),
    FOREIGN KEY         (manager_id) REFERENCES employee(id),

    CONSTRAINT not_manager_of_self CHECK (id <> manager_id)
);
