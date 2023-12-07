const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const errorLogStream = fs.createWriteStream(path.join(__dirname, '..', '/logs', 'error.log'), { flags: 'a' });

const accessLogStream = fs.createWriteStream(path.join(__dirname, '..', '/logs', 'access.log'), { flags: 'a' });

morgan.token('userAgent', function (req, res) {
  try {

    const headers = req.headers;
    const userAgent = headers[ 'user-agent' ];
    return JSON.stringify(userAgent);

  } catch (error) {

    console.error(chalk.red.bold('Error occurred, check error.log file for more details'));
    errorLogStream.write(error.stack)

  }

});

morgan.token('ip', function (req, res) {
  try {

    return req.ip;

  } catch (error) {

    console.error(chalk.red.bold('Error occurred, check error.log file for more details'));
    errorLogStream.write(error.stack)

  }

});

morgan.token('user', function (req, res) {
  try {

    return req.user?.username;

  } catch (error) {

    console.error(chalk.red.bold('Error occurred, check error.log file for more details'));
    errorLogStream.write(error.stack)

  }
});



module.exports = {

  accessLogger: morgan(':user :method :url :status :res[content-length] - :response-time ms :date[web] :ip :userAgent', { stream: accessLogStream }),

  errorLogger: (err, additionalInfo) => {

    try {

      if (!additionalInfo) {
        errorLogStream.write(err.stack);
        return
      }

      const errorMessage = `Error occurred: ${err.message}\nAdditional Info:\n
Route: ${additionalInfo.route} 
Method: ${additionalInfo.method}
IP: ${additionalInfo.ip}
User_agent: ${additionalInfo.user_agent}
user: ${additionalInfo.user.username}
Stack Trace: ${err.stack}\n\n`;

      errorLogStream.write(errorMessage);

      console.error(chalk.red('Error occurred, check error.log for more details'));

    } catch (error) {

      console.error(chalk.red.bold('Error occurred, check error.log file for more details'));
      errorLogStream.write(error.stack)

    }
  },

  consoleLogger: (message) => {
    console.log(chalk.blue('Custom Console Logging:'));
    console.log(chalk.blue(message));
  }
};
