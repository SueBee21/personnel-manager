var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",
    database: "personnel_managerDB",
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection successful! ID: " + connection.threadId + "\n");
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "menu",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View all Employees by Department", "View All Employees by Manager", "View Employees by Role", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager", "Remove Role", "Remove Department", "Exit Program"],
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View All Employees":
                    viewAll();
                    break;
                case "View all Employees by Department":
                    viewByDepartment();
                    break;
                case "View All Employees by Manager":
                    viewByManager();
                    break;
                case "View Employees by Role":
                    viewRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Update Employee Manager":
                    updateManager();
                    break;
                case "Remove Role":
                    removeRole();
                    break;
                case "Remove Department":
                    removeDepartment();
                    break;
                    connection.end();
            };
        });

    function viewAll() {
        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, title, name department, salary, CONCAT(manager.first_name, " ", manager.last_name) manager FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON employee.manager_id = manager.id;`, function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });
    };

    function viewByDepartment() {

        connection.query(`SELECT name FROM department`, function (err, res) {
            if (err) throw err;
            console.table(res);

            inquirer
                .prompt({
                    type: "list",
                    name: "View By Department",
                    message: "Select Department to View",
                    choices: function () {
                     var departmentChoices = [];
                        for (var i = 0; i < departmentChoices.length; i++) {
                            departmentChoices.push(res[i]);
                        }
                        console.log("success");
                        console.log(departmentChoices);
                        return departmentChoices;
                    }
                }).then(function (answer) {
                    start();
                });

        })
    };
    // function viewByManager() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };
    // function viewRole() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };
    // function addEmployee() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };
    // function removeEmployee() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };
    // function updateRole() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };
    // function updateManager() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };
    // function removeRole() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };
    // function removeDepartment() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };


};



