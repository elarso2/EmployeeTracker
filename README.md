# EmployeeTracker

[![MIT Badge](https://img.shields.io/badge/License-MIT-yellow.svg)](https://mit-license.org/)

## Description

This application allows the user to keep track of their companies employees, roles, and departments. Using MySQL, you can view all roles, employees, and departments, as well as add a new role, employee, and department, and update a current employees role.

## Dependencies

This program uses `mysql2`, `inquirer`, `express`, and `console.table` for functionality. The `dotenv` package is also used to protect private information.

## Usage

You may fork this repository, and then once navigating to the `db` folder you can open the terminal, log in to mysql, and run the following lines to seed the database:

```
> source schema.sql;
> source seeds.sql;
```

And then once back in the main terminal, you can run `node server.js` to initiate the inquirer prompts and begin utilizing the application.

## Demonstration

You can view a demonstration video of my application [here](https://drive.google.com/file/d/1SXaZj0zTGfOv22862W4g_cOswwyDC9RZ/view). And a screenshot of my functioning application can be viewed below.

![Application Screenshot]('./assets/screenshot.PNG').

## Troubleshooting

Currently, when trying to update an employee, a user can properly select an employee and their new role, and the associated employee and new role ID values are accurately being pulled, but the query to actually update the employee's role is not functioning properly. However, no error is logged, and the console shows "Employee Updated". There must be an issue with the UPDATE query, but I have not yet been able to fix it.

## Licensing

Copyright (c) 2022 Elizabeth Larson

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
