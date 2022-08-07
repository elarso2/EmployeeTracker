USE employee_db;

INSERT INTO department (deptName)
VALUES ("Engineering"),
("Human Resources"),
("Billing"),
("Marketing"),
("Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Manager", "150000", 1),
(2, "Department Head", 135000, 2),
(3, "Lead Billing Specialist", 140000, 3),
(4, "Social Media Coordinator", 115000, 4),
(5, "Senior Lawyer", 110000, 5);



INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "Nick", "Miller", 1, NULL),
(2, "Jessica", "Day", 2, 1),
(3, "Winston", "Schmidt", 4, NULL),
(4, "Winston", "Bishop", 3, NULL),
(5, "CeCe", "Pareek", 4, NULL);