const express = require('express');
const mysql = require('mysql2');
const Departments = require('./src/queries/departments.js');
const Roles = require('./src/queries/roles.js');
const Employees = require('./src/queries/employees.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let connection;

async function startProgram() {
    
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    });
    await connection.connect();

    const dept = new Departments(connection);
    const empl = new Employees(connection);
    const roles = new Roles(connection);
    dept.viewAll()
        .then((data) => {console.log(data)})
        .catch((err) => console.log(err));
    empl.viewAll()
        .then((data) => {console.log(data)})
        .catch((err) => console.log(err));
    roles.viewAll()
        .then((data) => {console.log(data)})
        .catch((err) => console.log(err));


    // connection.query(`SELECT * FROM Role;`)
    //     .then( result => console.log(result[0]))
    //     .catch(err => console.log(err));

}
// // Query database
// db.query('SELECT * FROM favorite_books', function (err, results) {
//   console.log(results);
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

function init(){
    startProgram();
}

init();