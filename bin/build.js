require('shelljs/global');

const path = require('path');
const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');

const installPackages = () => {
  console.log(chalk.white.bold('Installing Packages'));
  return new Promise((resolve, reject) => {
    let command = 'npm';
    let args = ['install'];


    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }
      resolve();
    })
  })
}

const build = (appName, type = 'basic') => {
  if (type === 'interop') {
    cp('-r', path.join(__dirname, '..', 'templates/interop'), appName);
  }
  if (type === 'basic') {
    cp('-r', path.join(__dirname, '..', 'templates/basic'), appName);
  }
  chmod(755, path.join(appName, 'scripts', 'copy.js'));
  console.log('----------------------------------------------------------');
  figlet.text('reason react', function(err, data) {
    if (err) {
      return;
    }
    console.log(data);
    console.log('----------------------------------------------------------');
    console.log(chalk.red.bold('Create Reason React App'));
    console.log('----------------------------------------------------------');
    cd(appName);
    installPackages().then(() => {
      console.log('');
      console.log('Reason React app successfully created!')
      console.log('');
      console.log(chalk.white.bold('Let\'s get started'));
      console.log('');
      ('----------------------------------------------------------');
      console.log(chalk.white('Step 1:'))
      console.log(chalk.red('cd into the newly created ' + appName + ' directory'));
      console.log('----------------------------------------------------------');
      console.log(chalk.white('Step 2'));
      console.log(chalk.red('npm start'));
      console.log('----------------------------------------------------------');
      console.log(chalk.white('Step 3'));
      console.log(chalk.red('Open browser and navigate to: http://localhost:8080/'))
    })
    .catch(error => {
      console.log(chalk.red('An unexpected error occurred'))
      console.log(chalk.red(error));
    });
  });
}

module.exports = build;
