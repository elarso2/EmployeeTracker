SELECT employee.employee_id AS "ID"
 employee.first_name AS "First Name"
 employee.last_name AS "Last Name"
roles.title AS "Job Title"
department.deptName AS "Departmemt"
roles.salary AS "Salary"
CONCAT (managers.employee_first_name, " ", managers.employee_last_name) AS "Manager"
FROM employee
LEFT JOIN roles on employee.role_id = roles_role_id
LEFT JOIN department on roles.department_id = department.department_id
LEFT JOIN employees AS managers on employees.manager_id = managers.employee_id;