class Employees {
    constructor(connection){
        this.connection = connection;
    }
    
    // View all employees
    async viewAll(){
        return new Promise((resolve, reject) => {
            this.connection.query(`SELECT * FROM employee LIMIT 10;`, function(err, results) {
                if (err) {
                  return reject(err);
                }
                return resolve(results);
            });
        });
    }

    // Add an employee
    async addDepartment(newEmployee){
        return new Promise((resolve, reject) => {
            this.connection.query(`INSERT INTO employees (name) VALUES (?);`, newEmployee, function(err, results) {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
}

module.exports = Employees;