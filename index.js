// Ask the user for information
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");

console.log(chalk.blue("Hello world!"));

inquirer
  .prompt([
    {
      type: "input",
      name: "Project Title",
      message: "What is the title of your project?",
    },
  ])
  .then((data) => {
    const filename = `README.md`;

    fs.writeFile(filename, JSON.stringify(data, null, "\t"), (err) =>
      err ? console.log(err) : console.log("Success!")
    );
  });
