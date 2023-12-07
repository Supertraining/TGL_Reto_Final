const express = require('express');
const app = express();
const UserRouter = require('./users/routes/user')
const RoomRouter = require('./rooms/routes/room')
const cors = require('cors')
const helmet = require('helmet')
const errorHandler = require('./middlewares/error')
const logHandler = require('./utils/logger.handler')

const userRoutes = new UserRouter();
const roomRoutes = new RoomRouter();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logHandler.accessLogger);

app.use('/api/user', userRoutes.getRouter());
app.use('/api/room', roomRoutes.getRouter());

app.use(errorHandler)

module.exports = app;