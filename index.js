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
        console.log(chalk.green.bold("Okay, let's get a move on then!", "\n"));
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
  fs.writeFile(fileName, data, (err) =>
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
      message: "Please tell me about your project in 100-500 characters?",
      validate: validateDescription,
    },
    {
      type: "input",
      name: "installation",
      message:
        "Please list the steps required to install? (separate steps with a comma)",
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
        "List anyone else who contributed to this project (comma separated)",
    },
    {
      type: "input",
      name: "tests",
      message: "What are the instructions to test this project?",
      validate: validateResponse,
    },
    {
      type: "input",
      name: "github",
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
  const filename = `SAMPLE.md`;
  writeToFile(filename, renderReadMe(inputs[0]));
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
  } else if (wordCount < 100) {
    return chalk.red(
      `Try and write a little more please! ${
        100 - wordCount
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

// Function to render the license badge
const renderLicense = (license) => {
  switch (license) {
    case "MIT":
      return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      break;
    case "Apache":
      return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      break;
    case "GPLv2":
      return "[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)";
      break;
    case "GPLv3":
      return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      break;
    case "BSD 3-clause":
      return "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
      break;
    case "No License":
      return "";
  }
};

// List Installation steps
const installSteps = (installation) => {
  let steps = "";
  installation.split(",").forEach((step) => {
    steps += `- ${step}\n`;
  });
  return steps;
};

// List contributors
const contributorsList = (contributors) => {
  let list = "";
  if (contributors) {
    contributors.split(",").forEach((person) => {
      list += `- ${person}\n`;
    });
  }
  return list;
};

// Render ReadMe
const renderReadMe = (answers) => {
  return `
  ${renderLicense(answers.license)}
  # ${answers.title}
  ## Description
  ${answers.description}
  - - - -
  ## Table of Contents
  1. [Installation](#installation)
  2. [Usage](#usage)
  3. [License](#license)
  4. [Contributing](#contributing)
  5. [Tests](#tests)
  6. [Questions](#questions)
  ## Installation
  ${installSteps(answers.installation)}
  ## Usage
  ${answers.usage}
  ## License
  This project is licensed under ${answers.license}.
  ## Contributing
  - ${answers.userName}
  ${contributorsList(answers.contributors)}
  ## Tests
  ${answers.tests}
  ## Questions
  If you have any questions please contact me via [GitHub](https://github.com/${
    answers.github
  }) or [Email](mailto:${answers.email})`;
};
