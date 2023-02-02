"use strict";

class Roles {
    constructor(connection){
        this.connection = connection;
    }
    
    // View all employees
    async viewAll(){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT id, title, CONCAT('$', LPAD(FORMAT(salary,2),11,' ')) as annual_salary, department_id FROM role ORDER BY salary DESC;`, function(err, results) {
                if (err) {
                  return reject(err);
                }
                return resolve(results);
            });
        });
    }

    // Add a role
    async addDepartment(newRole){
        return new Promise((resolve, reject) => {
            this.connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);`, newRole, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
}

module.exports = Roles;