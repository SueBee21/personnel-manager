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
            choices: ["View All Employees", "View Departments", "View Roles", "Add Employee", "Update Employee Role", "Add Role", "Add Department", "Exit Program"],
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View All Employees":
                    viewAll();
                    break;
                case "View Departments":
                    viewByDepartment();
                    break;
                case "View Roles":
                    viewRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateRole();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
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
            start();
        })
    };

    function viewRole() {
        connection.query(`SELECT title FROM role`, function (err, res) {
            if (err) throw err;
            console.table(res);
            start();
        });

    };


    // function addEmployee() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };

    function updateRole() {
        connection.query(`SELECT employee.id, employee.first_name, employee.last_name, title, name department, salary, CONCAT(manager.first_name, " ", manager.last_name) manager FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id;`, function (err, employees) {
           console.log(employees);
            var employeeList = employees.map(function (employee) {
                return employee.name;
            });
            console.log(employeeList);
            var roleList = roles.map(function (role) {
                return role.title;
            });
            console.log(roleList);

            inquirer.prompt([{
                type: "list",
                message: "Select an Employee to Update",
                name: "selectEmployeeUpdate",
                choices: employeeList,
            },
            {
                type: "list",
                message: "Select a New Role",
                name: "selectUpdatedRole",
                choices: roleList,
            }

            ]).then(function (userInput) {
                var nameObject = employees.find(function (employee) {
                    return employee.name === userInput.selectEmployeeUpdate;
                });
                var roleObject = roles.find(function (role) {
                    return role.title === userInput.selectUpdatedRole;
                });
                connection.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleObject.id, nameObject.id], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    start();
                });
            });
        });
    };

    function addRole() {
        connection.query("SELECT * FROM department", function (error, departments) {
            console.log(departments);
            var departmentList = departments.map(function (department) {
                return department.name;
            });
            console.log(departmentList);
            inquirer.prompt([{
                type: "input",
                message: "What Is the Title of The New Role?",
                name: "newTitle"
            },

            {
                type: "input",
                message: "What is the Salary?",
                name: "newSalary"
            },

            {
                type: "list",
                message: "What is the Department?",
                name: "newRoleDepartment",
                choices: departmentList,
            },

            ]).then(function (userInput) {
                var departmentObject = departments.find(function (department) {
                    return department.name === userInput.newRoleDepartment;
                })
                connection.query(`INSERT INTO role (title, salary, department_id) VALUES(?,?,?)`, [userInput.newTitle, userInput.newSalary, departmentObject.id], function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    start();
                });
            })

        })

    };

    function addDepartment() {
        inquirer.prompt({
            type: "input",
            message: "What Department Would You Like to Add?",
            name: "newDepartment",

        }).then(function (userInput) {
            connection.query("INSERT INTO department (name) VALUES (?)", userInput.newDepartment, function (err, res) {
                if (err) throw err;
                console.table(res);
                start();
            });
        })

    };

};



                //     case "View All Employees by Manager":
                //         viewByManager();
                //         break;

                                //     case "Remove Employee":
                //         removeEmployee();
                //         break;
                                //     case "Update Employee Manager":
                //         updateManager();
                //         break;
                                //     case "Remove Role":
                //         removeRole();
                //         break;
                                //     case "Remove Department":
                //         removeDepartment();
                //         break;



                    // function viewByManager() {
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

        // function removeDepartment() {
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

        // function updateManager() {
    //     connection.query(      , function (err, res)[
    //             if (err) throw err;
    //     console.table(res);
    //     start();
    //         ]);
    // };




