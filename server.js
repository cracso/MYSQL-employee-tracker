var inquirer = require('inquirer');
const cTable = require('console.table');

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employees_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    mainMenu();
  });

  function mainMenu(){
      //inqurier ask user what to do
      //based on response go to specfici fx
      inquirer
  .prompt([
    {
      type: "list",
      choices: [
        "view department","view roles", "view employees", 
        "add department", "add role", "add employees", "update employee roles", "exit"
      ],
      message: "What would you like to do?",
      name: "action"
    }
  ])
  .then(function(response) {
    switch(response.action) {
        case "view department":
            getDepartment();
          // code block
          break;
        case "add department":
          // code block
          addDepartment();
          break;
        default:
            console.log("goodbye!")
          // code block
      }
  });

  }

  function addDepartment(){
      console.log("inside add dept")
      inquirer
  .prompt([
    {
      type: "input",
      message: "What is your department name?",
      name: "depName"
    }    
  ])
  .then(function(userresponse) {
    var query = connection.query(
        "INSERT INTO department SET ?",
        {
          name: userresponse.depName,
        },
        function(err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department inserted!\n");
          // Call updateProduct AFTER the INSERT completes
         // console.table(res)
          mainMenu();
        }
      );

  });

      //1. ask all the q;estion via inqu to get data 
        //name
      //2. create the data and put into the db
  }

  function addRoles(){}

  function addEmployees(){}

  function getDepartment(){
      console.log("inside get department")
      connection.query("SELECT * FROM department order by id", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        connection.end();
      });
  }

  function getRoles(){}

  function getEmployees(){}

  function updateEmployeeRole(){}
  
