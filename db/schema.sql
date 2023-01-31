DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

CREATE TABLE department (
    id                  INT unsigned NOT NULL AUTO_INCREMENT,   # Unique ID for the record
    name                VARCHAR(30) NOT NULL,                   # Name of the department
    PRIMARY KEY         (id)
);