// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");

// Ask the user if they would like to continue or exit
const startGenerator = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "Shall we get started?",
        choices: ["Yes, Please!", "Nah"],
      },
    ])
    .then((data) => {
      const answer = data.start;
      if (answer === "Yes, Please!") {
        console.log(answer);
      } else {
        console.log(answer);
      }
    });
};

// Introduce Application
const intro = () => {
  console.log(
    chalk.green(
      figlet.textSync("ReadMe Generator", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
  console.log(
    chalk.bgGreen.bold.white(
      "--- Let's create an awesome ReadMe for your project! ---",
      "\n"
    )
  );
  startGenerator();
};

intro();

// TODO: Create an array of questions for user input
const questions = [];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
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
}

// Function call to initialize app
// init();
