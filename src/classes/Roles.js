"use strict";

const connection = require('../../connection');

class Roles {
    
    // View all employees
    async viewAll(){
        return new Promise((resolve, reject) => {
            connection.query(`
        SELECT 
            role.id, 
            title, 
            name as dept_name, 
            CONCAT('$', LPAD(FORMAT(salary,2),11,' ')) as annual_salary 
        FROM role 
        JOIN department dept ON department_id = dept.id
        ORDER BY title AND salary DESC;`, function(err, results) {
                if (err) {
                  return reject(err);
                }
                return resolve(results);
            });
        });
    }

    // Add a role
    async addRole(newRole){
        return new Promise((resolve, reject) => {
            connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, newRole, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
}

module.exports = Roles;