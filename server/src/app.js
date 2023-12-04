const express = require('express');
const app = express();
const UserRouter = require('./users/routes/user')

const userRoutes = new UserRouter();

app.use(express.json());
app.use('/api/user', userRoutes.getRouter())

module.exports = app;