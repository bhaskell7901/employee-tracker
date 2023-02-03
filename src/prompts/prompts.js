"use strict";

const Employee = require('../classes/Employees');
console.log(Employee);
const employee = new Employee();
console.log(employee);
let example = employee.listAllEmployees();
console.log(example);
const mainMenu = [
    {
        name: "mainMenuAction",
        message: "What would you like to do?",
        type: "list",
        choices: [
                    "View Departments - All",
                    "View Roles - All",
                    "View Employees - All",
                    "Update - Employee Role",
                    "Add - Department",
                    "Add - Role",
                    "Add - Employee",
                    "Exit"
                ],
        pageSize: 12
    }
]

const updateEmployeeRole = [
    {
        name: "employeeName",
        message: "Which employee would you like to update?",
        type: "list",
        choices: example,
        pageSize: 12
    }
]
module.exports = { mainMenu, updateEmployeeRole }; //