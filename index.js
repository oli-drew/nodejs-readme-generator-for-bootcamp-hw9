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
      "----- Let's create an awesome ReadMe for your new project! -----",
      "\n"
    )
  );
  startGenerator();
};

intro();

// TODO: Create a function to write README file
const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, JSON.stringify(data, null, "\t"), (err) =>
    err ? console.log(err) : console.log("Success!")
  );
};

// Collect answers asynchronously
const collectAnswers = async (userInputs = []) => {
  // Array of questions to ask
  const questions = [
    {
      type: "input",
      name: "userName",
      message: "First of all, what is your name?",
    },
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
    },
    {
      type: "input",
      name: "description",
      message: "Please tell me about your project in 50-100 words?",
    },
    {
      type: "input",
      name: "installation",
      message: "Please describe the steps required to install?",
    },
    {
      type: "input",
      name: "usage",
      message: "How do you use the application?",
    },
    {
      type: "list",
      name: "license",
      message: "?",
      choices: [
        "MIT",
        "Apache",
        "GPLv2",
        "GPLv3",
        "BSD 3-clause",
        "No License",
      ],
    },
    {
      type: "input",
      name: "contributors",
      message: "Did anyone else contribute? If so, please list them!",
    },
    {
      type: "input",
      name: "tests",
      message: "What are the instructions to test this project?",
    },
    {
      type: "input",
      name: "gitHub",
      message: "Please provide your GitHub user name?",
    },
    {
      type: "input",
      name: "email",
      message: "Final question! What is your developer email address?",
    },
  ];

  // Collect answers in the newInputs array
  const { again, ...answers } = await inquirer.prompt(questions);
  const newInputs = [...userInputs, answers];
  return again ? collectInputs(newInputs) : newInputs;
};

// Run the collectAnswers function and write to file
async function init() {
  const inputs = await collectAnswers();
  console.log(inputs);
  const filename = `SAMPLE.md`;
  writeToFile(filename, inputs);
}
