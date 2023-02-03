"use strict";

const connection = require('../../connection');

class Departments {
    
    // View all departments
    async viewAll(){
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM department ORDER BY name;`, function(err, results) {
                if (err) {
                  return reject(err);
                }
                return resolve(results);
            });
        });
    }

    // Add a department
    async addDepartment(newDeptName){
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO department (name) VALUES (?);`, newDeptName, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }

    // Add a department
    async viewDepartmentBudgets(){
        return new Promise((resolve, reject) => {
            connection.query(`SELECT 
            agg.dept AS dept_name,
            CONCAT('$', LPAD(FORMAT(SUM(agg.annual_salary), 2),14 ,' ')) AS budget
        FROM
        (SELECT 
            emp.id,
            emp.first_name as first_name, 
            emp.last_name as last_name,
            title,
            name AS dept,
            salary AS annual_salary
        FROM employee emp
        LEFT JOIN employee mgr ON emp.manager_id = mgr.id
        LEFT JOIN role ON emp.role_id = role.id
        LEFT JOIN department ON department_id = department.id
        ORDER BY emp.last_name, emp.first_name, title, name) AS agg
        GROUP BY agg.dept;`, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
}

module.exports = Departments;