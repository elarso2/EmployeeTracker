const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employee_db",
  },
  console.log(`Connected to the employee_db database.`)
);

// First function which will allow user to choose what information they would like to view or add
function init() {
  inquirer
    .prompt({
      type: "list",
      name: "goal",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    })
    .then(function (data) {
      if (data.goal == "Add an employee") {
        newEmp();
      } else if (data.goal == "Add a department") {
        newDept();
      } else if (data.goal == "Add a role") {
        newRole();
      } else {
        return;
      }
    });
}

// Function to add a new employee
function newEmp() {
  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?",
    },
    {
      type: "input",
      name: "role",
      message: "What is the employee's role?",
    },
    {
      type: "input",
      name: "manager",
      message: "Please enter the name of this employee's manager.",
    },
  ]);
}

// Function to add a new department
function newDept() {
  inquirer.prompt([
    {
      type: "input",
      name: "newDept",
      message: "Enter the name of the department you would like to add.",
    },
  ]);
}

// Function to add a new role
function newRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "What role would you like to add?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this new role?",
    },
    //maybe update dept to a choices selection and display all current departments?
    {
      type: "input",
      name: "dept",
      message: "What department is this new role in?",
    },
  ]);
}

init();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
