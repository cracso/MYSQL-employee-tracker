USE employees_db;

INSERT INTO department (name)
VALUES ("IT");

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("IT Manager", 80000,1);

INSERT INTO role (title, salary, department_id)
VALUES ("IT intern", 0,1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 50000,2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Oscar", "Chiriboga", 1 ,null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alex", "Jones", 2 ,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Vivian", "Nguyen", 3 ,null);
