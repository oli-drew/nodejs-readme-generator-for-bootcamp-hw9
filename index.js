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
      name: "Title",
      message: "What is the title of your project....?",
    },
    {
      type: "input",
      name: "Description",
      message: "Please tell me about your project?",
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
