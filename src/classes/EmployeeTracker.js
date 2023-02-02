"use strict";

const Departments = require('./Departments');
const Roles = require('./Roles.js');
const Employees = require('./Employees.js');

const inquirer = require('inquirer');
const prompts = require('../prompts/prompts');

const cTable = require('console.table');

class EmployeeTracker {
    constructor(dbConnection) {
        this.inquirer = inquirer;
        this.prompts = prompts;
        this.departments = new Departments(dbConnection);
        this.roles = new Roles(dbConnection);
        this.employees = new Employees(dbConnection);
    }

    async run(){
        let again = true;

        do{
            again = await this.displayMainMenu();
        }while(again);
    }

    async displayMainMenu() {
        const answers = await this.inquirer.prompt(this.prompts.mainMenu);
        switch (answers.mainMenuAction){
            case "View Departments - All":
                try{
                    console.table(await this.departments.viewAll());
                    return true;
                } catch(err){
                    console.log(err);
                    return false;
                }
            case "View Roles - All":
                try{
                    console.table(await this.roles.viewAll());
                    return true;
                } catch(err){
                    console.log(err);
                    return false;
                }
            case "View Employees - All":
                try{
                    console.table(await this.employees.viewAll());
                    return true;
                } catch(err){
                    console.log(err);
                    return false;
                }
            case "Update - Employee Role":
                try{
                    // TODO: add update Employee Role
                    return true;
                } catch(err){
                    console.log(err);
                    return false;
                }
            case "Add - Department":
                try{
                    // TODO: add Department
                    return true;
                } catch(err){
                    console.log(err);
                    return false;
                }
            case "Add - Role":
                try{
                    // TODO: add Role
                    return true;
                } catch(err){
                    console.log(err);
                    return false;
                }
            case "Add - Employee":
                try{
                    // TODO: add Employee
                    return true;
                } catch(err){
                    console.log(err);
                    return false;
                }
            case "Exit":
                    // TODO: Transfer back to server and close out
                    console.log("Closing Program...");
                    return false;
            default:
                return false;
        }
    }
}

module.exports = EmployeeTracker;