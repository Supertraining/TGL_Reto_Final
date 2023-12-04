const UserControllers = require('../controller/user');
const UserServices = require('../service/user');
const { models } = require('../../db/sequelize')
const router = require('express').Router()
const isAuthenticated = require('../../middlewares/authValidation')
const authorize = require('../../middlewares/roleValidation')

class UserRouter {
  constructor() {
    const userService = new UserServices(models)
    const userControllers = new UserControllers(userService)



    router.post('/register', userControllers.register)
  
    router.post('/login', userControllers.login);
  
    router.use(isAuthenticated)
  
    router.get('/', authorize('admin'), userControllers.getAll);
  
    router.get('/:id', userControllers.getById);
  
    router.put('/:id', userControllers.update)
  
    router.delete('/:id', authorize('admin'), userControllers.delete)
  
  }
  getRouter()
  {
    return router
  }

}

module.exports = UserRouter;
