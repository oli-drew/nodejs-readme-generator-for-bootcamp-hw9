// Packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");

// Exit application
const exitGenerator = () => {
  console.log(
    chalk.yellow(
      figlet.textSync("See you again soon!", {
        font: "Small",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );
};

// Ask the user if they would like to start or exit
const startGenerator = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "start",
        message: "Shall we get started?",
        choices: ["Yes, Please!", "Nah, I hate great readme's"],
      },
    ])
    .then((data) => {
      const answer = data.start;
      if (answer === "Yes, Please!") {
        console.log(chalk.green.bold("Okay, let's get started then!", "\n"));
        // Start asking questions
        init();
      } else {
        exitGenerator();
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
      "----- Let's create an awesome ReadMe for your project! -----",
      "\n"
    )
  );
  startGenerator();
};

intro();

// Array of questions for user input
const questions = [
  {
    type: "input",
    question: "Title",
    message: "What is the title of your project....?",
  },
  {
    type: "input",
    question: "Description",
    message: "Please tell me about your project?",
  },
];

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, JSON.stringify(data, null, "\t"), (err) =>
    err ? console.log(err) : console.log("Success!")
  );
};

// TODO: Create a function to initialize app
function init() {
  // Question One
  inquirer
    .prompt([
      {
        type: questions[0].type,
        name: questions[0].question,
        message: questions[0].message,
      },
      {
        type: questions[1].type,
        name: questions[1].question,
        message: questions[1].message,
      },
    ])
    .then((data) => {
      // Log the answer
      console.log(data);

      // writeToFile()
    });
}

// inquirer
//       .prompt([
//         {
//           type: questions[0].type,
//           name: questions[0].name,
//           message: questions[0].message,
//         },
//       ])
//       .then((data) => {
//         const filename = `README.md`;

//         fs.writeFile(filename, JSON.stringify(data, null, "\t"), (err) =>
//           err ? console.log(err) : console.log("Success!")
//         );
//       });
