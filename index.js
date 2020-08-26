var inquirer = require('inquirer');
const cTable = require('console.table');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: procces.env.MYSQL_key,
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  mainMenu();
});

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        choices: [
          "view department", "view roles", "view employees",
          "add department", "add role", "add employees", "update employee roles", "find employee by id", "exit"
        ],
        message: "What would you like to do?",
        name: "action"
      }
    ])
    .then(function (response) {
      switch (response.action) {
        case "view department":
          getDepartment();

          break;
        case "view roles":

          getRoles();
          break;
        case "view employees":

          getEmployees();
          break;
        case "add department":

          addDepartment();
          break;
        case "add role":

          addRoles();
          break;
        case "add employees":

          addEmployees();
          break;

        case "find employee by id":

          findById();
          break;

        case "update employee roles":
          updateEmployeeRole();
          break;

        default:
          console.log("goodbye!")

      }
    });

}

function addDepartment() {
  console.log("inside add dept")
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your department name?",
        name: "depName"
      }
    ])
    .then(function (userresponse) {
      var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: userresponse.depName,
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department inserted!\n");

          mainMenu();
        }
      );

    });

}

function addRoles() {
  console.log("inside add roles")
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your title?",
        name: "roleTitle"
      },
      {
        type: "input",
        message: "What is your salary?",
        name: "roleSal"
      },
      {
        type: "input",
        message: "What is your department id?",
        name: "depId"
      }
    ])
    .then(function (userresponse) {
      var query = connection.query(
        "INSERT INTO role SET ?",
        {
          title: userresponse.roleTitle,
          salary: userresponse.roleSal,
          department_id: userresponse.depId
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " role inserted!\n");
          mainMenu();
        }
      );
    })
}

function addEmployees() {
  console.log("inside add employees")
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your first name?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What is your last name?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is your role id?",
        name: "roleId"
      },
      {
        type: "input",
        message: "What is your manager id?",
        name: "managId"
      }
    ])
    .then(function (userresponse) {
      var query = connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: userresponse.firstName,
          last_name: userresponse.lastName,
          role_id: userresponse.roleId,
          manager_id: userresponse.managId
        },
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " employee inserted!\n");
          mainMenu();
        }
      );
    })
}

function getDepartment() {
  connection.query("SELECT * FROM department order by id", function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

function getRoles() {
  connection.query("SELECT * FROM role order by id", function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

function getEmployees() {
  connection.query("SELECT * FROM employee order by id", function (err, res) {
    if (err) throw err;
    console.table(res);
    mainMenu();
  });
}

function findById() {
  console.log("find employee by id \n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee id?",
        name: "employeeId"
      }
    ]).then(function (userresponse) {
      console.log(userresponse);
      var query = connection.query(
        "SELECT * FROM employee where id=?",
        [
          userresponse.employeeId
        ],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          mainMenu();

        }
      );


    })
}

function updateEmployeeRole() {
  console.log("Update Employee Role \n");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your role id?",
        name: "roleId"
      },
      {
        type: "input",
        message: "What is your employee id?",
        name: "emplId"
      }
    ])
    .then(function (userresponse) {
      console.log(userresponse)
      var query = connection.query(
        "UPDATE employee SET ? WHERE ?",
        [
          {
            role_id: userresponse.roleId
          },
          {
            id: userresponse.emplId
          }
        ],
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " products updated!\n");
          mainMenu();

        }
      );

    })

}