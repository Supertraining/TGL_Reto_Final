const logHandler = require('../utils/logger.handler')

const error = (err, req, res, next) => {

  try {

    const errorStatus = err.status || 500
    const errorMessage = !err.status ? 'Internal server error' : err.message

    const additionalInfo = {
      route: req.originalUrl,
      method: req.method,
      ip: req.ip,
      user_agent: req.headers[ 'user-agent' ],
      user: req.user,
    };

    logHandler.errorLogger(err, additionalInfo)
    return res.status(errorStatus).send(errorMessage)

  } catch (error) {

    logHandler.errorLogger(error)

  }



}

module.exports = error;