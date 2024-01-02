const express = require('express');
const UserRouter = require('./apis/users/routes/user')
const RoomRouter = require('./apis/rooms/routes/room')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middlewares/error.handler')
const logHandler = require('./utils/logger.handler')
const nonExistentRoute = require('./middlewares/routeValidation')
require('dotenv').config();

const app = express();

app.set('trust proxy', 1)
app.get('/ip', (request, response) => response.send(request.ip))
app.get('/x-forwarded-for', (request, response) => response.send(request.headers['x-forwarded-for']))

const userRoutes = new UserRouter();
const roomRoutes = new RoomRouter();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, try again in 15 minutes'
});

app.use(helmet());
app.use(cors({
  origin: [ process.env.CLIENT_PROD_URL,  process.env.CLIENT_DEV_URL ],
  credentials: true
}));
app.use(limiter);
app.use(express.json());
app.use(logHandler.accessLogger);

app.use('/api/user', userRoutes.getRouter());
app.use('/api/room', roomRoutes.getRouter());

app.use(nonExistentRoute);

app.use(errorHandler);

module.exports = app;