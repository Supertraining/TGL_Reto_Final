const UserControllers = require('../controller/user');
const UserServices = require('../service/user');
const { models } = require('../../db/postgreSQL/sequelize');
const router = require('express').Router();
const isAuthenticated = require('../../middlewares/authValidation');
const authorize = require('../../middlewares/roleValidation');
const validate  = require('../../middlewares/dataValidation')
class UserRouter {
  constructor() {
    const userService = new UserServices(models)
    const userControllers = new UserControllers(userService)

    router.post('/register', validate.user, userControllers.register)

    router.post('/login', validate.userLogin, userControllers.login);

    router.use(isAuthenticated)

    router.patch('/reservation/:id', validate.reservation, userControllers.createReservation)

    router.get('/', authorize('admin'), userControllers.getAll);

    router.get('/:id', userControllers.getById);

    router.put('/:id', validate.user, userControllers.update)

    router.delete('/:id', authorize('admin'), userControllers.delete)

  }
  getRouter() {
    return router
  }

}

module.exports = UserRouter;
