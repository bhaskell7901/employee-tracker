"use strict";

require('console.table');

const Departments = require('./src/classes/Departments');
const Roles = require('./src/classes/Roles.js');
const Employees = require('./src/classes/Employees.js');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const departments = new Departments();
const roles = new Roles();
const employees = new Employees();


async function run(){
    let again = true;

    do{
        again = await displayMainMenu();
    }while(again);
}

async function displayMainMenu() {
    const answers = await inquirer.prompt([
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
    ]);
    switch (answers.mainMenuAction){
        case "View Departments - All":
            try{
                console.table(await departments.viewAll());
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        case "View Roles - All":
            try{
                console.table(await roles.viewAll());
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        case "View Employees - All":
            try{
                console.table(await employees.viewAll());
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        case "Update - Employee Role":
            try{
                await updateEmployeeRole();
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        case "Add - Department":
            try{
                await addDepartment();
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        case "Add - Role":
            try{
                await addRole();
                return true;
            } catch(err){
                console.log(err);
                return false;
            }
        case "Add - Employee":
            try{
                await addEmployee();
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

async function addDepartment(){
    
    const answers = await inquirer.prompt([
        {
            name: "addDeptSubMenu",
            message: "What is the department name?",
            type: "input"
        }
    ]);
    try{
        departments.addDepartment(answers.addDeptSubMenu.trim());
    }
    catch (err){
        console.log(err.code);
        console.log(err.sqlMessage);
        addDepartment();
    }

}

async function addRole(){
    const depts = await departments.viewAll();
    const deptNames = depts.map(depts => depts.name);

    const answers = await inquirer.prompt([
        {
            name: "roleName",
            message: "What is the role name?",
            type: "input"
        },
        {
            name: "salary",
            message: "What is the salary for this role?",
            type: "number"
        },
        {
            name: "deptName",
            message: "What is department this role will belong to?",
            type: "list",
            choices: deptNames
        }
    ]);
    try{
        let output = [];
        let index = depts.findIndex(dept => dept.name === answers.deptName);
    
        output.push(answers.roleName.trim());
        output.push(answers.salary);
        output.push(depts[index].id);

        roles.addRole(output);
    }
    catch (err){
        console.log(err.code);
        console.log(err.sqlMessage);
        addDepartment();
    }

}

async function addEmployee(){
    const roleList = await roles.viewAll();
    const managers = await employees.getManagerList();
    const roleNames = roleList.map(role => role.title);
    const managerNames = managers.map(manager => manager.whole_name);

    const answers = await inquirer.prompt([
        {
            name: "employeeFirst",
            message: "What is the employee's first name?",
            type: "input"
        },
        {
            name: "employeeLast",
            message: "What is the employees last name?",
            type: "input"
        },
        {
            name: "roleName",
            message: "What is role this employee to be assigned to?",
            type: "list",
            choices: roleNames
        },
        {
            name: "managerName",
            message: "Who is the employee's manager?",
            type: "list",
            choices: managerNames
        }
    ]);
    try{
        let output = [];
        let rolesIndex = roleList.findIndex(role => role.title === answers.roleName);
        let managerIndex = managers.findIndex(manager => manager.whole_name === answers.managerName);
        const maxId = await employees.getMaxEmployeeId();
    
        output.push(maxId[0].id + 1);
        output.push(answers.employeeFirst.trim());
        output.push(answers.employeeLast.trim());
        output.push(roleList[rolesIndex].id);
        output.push(managers[managerIndex].id);

        employees.addEmployee(output);
    }
    catch (err){
        console.log(err.code);
        console.log(err.sqlMessage);
        addDepartment();
    }
}

async function updateEmployeeRole(){
    const employeeList = await employees.viewAll();
    const roleList = await roles.viewAll();
    const employeeNames = employeeList.map((empl) => { return `${empl['last_name']}, ${empl['first_name']}` });
    const roleNames = roleList.map(role => role.title);

    const answers = await inquirer.prompt([
        {
            name: "employeeName",
            message: "What is the employee's name?",
            type: "list",
            choices: employeeNames
        },
        {
            name: "roleName",
            message: "What is the role to they should be assigned?",
            type: "list",
            choices: roleNames
        }
    ]);
    try{
        let output = [];
        let employeeIndex = employeeNames.findIndex(name => name === answers.employeeName);
        let roleIndex = roleNames.findIndex(role => role === answers.roleName);
    
        output.push(roleList[roleIndex].id);
        output.push(employeeList[employeeIndex].id);
        
        employees.updateEmployee(output);
    }
    catch (err){
        console.log(err.code);
        console.log(err.sqlMessage);
        addDepartment();
    }
}


run();

