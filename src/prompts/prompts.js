"use strict";

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

module.exports = { mainMenu };