var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 8080,

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
            choices: ["View All Employees", "View all Employees by Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager"],
        })
        .then(function (answer) {
            switch (answer.menu) {
                case "View All Employees":
                    viewAll();
                    break;
            //     case "View all Employees by Department":
            //         viewByDepartment();
            //         break;
            //     case "View All Employees by Manager":
            //         viewByManager();
            //         break;
            //     case "Add Employee":
            //         addEmployee();
            //         break;
            //     case "Remove Employee":
            //         removeEmployee();
            //         break;
            //     case "Update Employee Role":
            //         updateRole();
            //         break;
            //     case "Update Employee Manager":
            //         updateManager();
            //         break;
            connection.end();
            };
        });
        function viewAll(){
            connection.query("SELECT * FROM employee", function(err, res){
                if (err) throw err;
                console.table(res);
                start();
            });
        };
};



