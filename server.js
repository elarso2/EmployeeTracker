const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const express = require("express");
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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
        "Exit the program",
      ],
    })
    .then(function (data) {
      if (data.goal == "Add an employee") {
        newEmp();
      } else if (data.goal == "Add a department") {
        newDept();
      } else if (data.goal == "Add a role") {
        newRole();
      } else if (data.goal == "View all departments") {
        showDepts();
      } else if (data.goal == "View all employees") {
        showEmp();
      } else if (data.goal == "View all roles") {
        showRoles();
      } else if (data.goal == "Update an employee role") {
        updateRole();
      } else if (data.goal == "Exit the program") {
        console.log("Goodbye :) ");
        process.exit();
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
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDept",
        message: "Enter the name of the department you would like to add.",
      },
    ])
    .then(function (data) {
      const deptName = data.newDept;
      const sql = "INSERT INTO department(name) VALUES (?)";
      db.query(sql, deptName, function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table("Department Added");
        init();
      });
    });
}

// Function to add a new role
function newRole() {
  inquirer
    .prompt([
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
    ])
    .then(function (data) {
      const dept = data.dept;
      const deptId = "SELECT id FROM `department` WHERE name = ?";
      const finalId = db.query(deptId, dept, function (err, results) {
        if (err) {
          console.log(err);
        }
        console.table(results);
        const role = data.role;
        const salary = data.salary;
        console.log(role);
        console.log(salary);
        console.log(finalId);
        // const sql =
        //   "INSERT INTO roles(title, salary, department_id) VALUES ('?', ?, ?)";
        // db.query(sql, role, salary, finalId, function (err, results) {
        //   if (err) {
        //     console.log(err);
        //   }
        //   console.table(results);
        // });
      });
    });
}

// Function to display all departments
function showDepts() {
  db.query("SELECT * from `department`", function (err, results) {
    console.table(results);
    init();
  });
}

// Function to display all employees
function showEmp() {
  db.query(
    'SELECT employee.id AS "ID",employee.first_name AS "First Name", employee.last_name AS "Last Name", roles.title AS "Role", roles.salary AS "Salary", department.name AS "Department" FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id'
  ),
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
    };
}

// Function to display all roles
function showRoles() {
  db.query("SELECT * FROM `roles`", function (err, results) {
    console.table(results);
    init();
  });
}

// Function to update an employee role
function updateRole() {
  const employeeList = [];
  db.query("SELECT first_name FROM employee");
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeID",
        message:
          "What is the id of the employee who's role you'd like to update?",
      },
      {
        type: "input",
        name: "newRole",
        message: "What is the employees new role?",
      },
    ])
    .then(function (data) {
      const roleID = db.query("SELECT id FROM roles WHERE title = ?");
      const title = data.newRole;
      db.query(roleID, title, function (err, results) {
        if (err) {
          console.log(err);
        }
        const rId = results;
      }).then(function () {
        const employ = data.employeeID;
        const sql = "UPDATE employee SET role_id = rId WHERE id = ?";
        db.query(sql, employ, function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log("Employee role updated.");
        });
      });
    });
}

init();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
