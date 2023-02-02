"use strict";

const mysql = require('mysql2');
const EmployeeTracker = require('./src/classes/EmployeeTracker');

async function startProgram() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    });
    connection.connect();

    const employeeTracker = new EmployeeTracker(connection);

    employeeTracker.run();
    // console.log("Past employee tracker...");
}

startProgram();

