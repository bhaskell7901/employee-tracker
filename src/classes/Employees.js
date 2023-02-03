"use strict";

const connection = require('../../connection');

class Employees {
    
    // View all employees
    async viewAll(){
        return new Promise((resolve, reject) => {
            connection.query(`SELECT 
            emp.id,
            emp.first_name as first_name, 
            emp.last_name as last_name,
            title,
            name AS dept,
            CONCAT('$', LPAD(FORMAT(salary, 2), 12, ' ')) AS annual_salary,
            CASE 
                WHEN mgr.first_name IS NULL THEN "-"
                ELSE mgr.first_name
            END as mgr_first_name,
            CASE 
                WHEN mgr.last_name IS NULL THEN "-"
                ELSE mgr.last_name
            END as mgr_last_name
        FROM employee emp
        LEFT JOIN employee mgr ON emp.manager_id = mgr.id
        LEFT JOIN role ON emp.role_id = role.id
        LEFT JOIN department ON department_id = department.id
        ORDER BY emp.last_name, emp.first_name, title, name;`, function(err, results) {
                if (err) {
                  return reject(err);
                }
                return resolve(results);
            });
        });
    }

    // Add an employee
    async addEmployee(newEmployee){
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?);`, newEmployee, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }

    // Add an employee
    async updateEmployee(employee){
        return new Promise((resolve, reject) => {
            connection.query(`UPDATE employee SET role_id = ?  WHERE id = ?;`, employee, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }

    async listAllEmployees(){
        return ["Mey Message", "Testing this"];
    }

    // Get managers list
    async getManagerList(){
        return new Promise((resolve, reject) => {
            connection.query(`
            WITH mgr_ids AS (SELECT DISTINCT manager_id FROM employee WHERE manager_id IS NOT NULL),
            emp_ids AS (SELECT id AS manager_id FROM employee WHERE manager_id IS NULL),
            all_mgr_ids AS (SELECT mgr_ids.manager_id FROM mgr_ids UNION SELECT emp_ids.manager_id FROM emp_ids)
       
       SELECT
           emp.id,
           first_name,
           last_name,
           CONCAT(last_name, ', ', first_name) AS whole_name
       FROM employee emp 
       JOIN all_mgr_ids ON all_mgr_ids.manager_id = emp.id
       ORDER BY whole_name;`, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
     
    // Add an employee
    async getMaxEmployeeId(){
        return new Promise((resolve, reject) => {
            connection.query(`SELECT MAX(id) AS id FROM employee;`, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
    
}

module.exports = Employees;