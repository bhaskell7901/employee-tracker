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
}

module.exports = Departments;