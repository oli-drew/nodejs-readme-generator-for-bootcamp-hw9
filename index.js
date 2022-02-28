// Packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const chalk = require("chalk");
const figlet = require("figlet");
const emailValidator = require("email-validator");

// Exit application
const exitGenerator = (message) => {
  console.log(
    chalk.yellow(
      figlet.textSync(message, {
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
        exitGenerator("Bye for now!");
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
    err ? console.log(err) : exitGenerator("Enjoy your ReadMe")
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
      validate: validateResponse,
    },
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "description",
      message: "Please tell me about your project in 200-500 characters?",
      validate: validateDescription,
    },
    {
      type: "input",
      name: "installation",
      message: "Please describe the steps required to install?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "usage",
      message: "How do you use the application?",
      validate: validateResponse,
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
      message:
        "Did anyone else contribute? If so, please list them! (Leave blank if just you)",
    },
    {
      type: "input",
      name: "tests",
      message: "What are the instructions to test this project?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "gitHub",
      message: "Please provide your GitHub user name?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "email",
      message: "Final question! What is your developer email address?",
      validate: validateEmail,
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

// Validate Response
const validateResponse = (response) => {
  if (!response) {
    return chalk.red("You have to type something!");
  }
  return true;
};

// Validate Description Response
const validateDescription = (response) => {
  const wordCount = response.length;
  if (!response) {
    return chalk.red("You have to type something!");
  } else if (wordCount < 200) {
    return chalk.red(
      `Try and write a little more please! ${
        200 - wordCount
      } more characters to go`
    );
  } else if (wordCount > 500) {
    return chalk.red("That's too long, I'm bored.");
  }
  return true;
};

// Validate email address
const validateEmail = (response) => {
  if (emailValidator.validate(response)) {
    return true;
  } else {
    return chalk.red("That's not a valid email address");
  }
};
