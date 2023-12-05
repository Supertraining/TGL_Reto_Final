const express = require('express');
const app = express();
const UserRouter = require('./users/routes/user')
const RoomRouter = require('./rooms/routes/room')
const cors = require('cors')

const userRoutes = new UserRouter();
const roomRoutes = new RoomRouter();

app.use(express.json());
app.use(cors())
app.use('/api/user', userRoutes.getRouter());
app.use('/api/room', roomRoutes.getRouter());

module.exports = app;