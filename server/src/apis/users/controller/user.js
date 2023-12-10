const jwtHandle = require('../../../utils/jwt.handler')

class UserControllers {

  constructor(userService) {
    this.userService = userService
  }
  getAll = async (req, res, next) => {
    try {

      const users = await this.userService.getAll()
      users.length === 0
        ? res.status(204).send()
        : res.status(200).json(users)

    } catch (error) {
      next(error)
    }

  }

  getById = async (req, res, next) => {
    try {

      const user = await this.userService.getById(req.params.id)
  
      res.status(200).json(user)

    } catch (error) {
      next(error)
    }

  }

  login = async (req, res, next) => {
    try {

      const { username, password } = req.body

      const user = await this.userService.login(username, password)

      const token = await jwtHandle.createToken({ id: user.id, username: user.username, role: user.role, myReservations: user.myReservations })

      res.send(token)

    } catch (error) {
      next(error)
    }

  }

  register = async (req, res, next) => {
    try {

      const registeredUser = await this.userService.register(req.body)
      
      res.status(201).send(`User ${registeredUser.username} created successfully`)

    } catch (error) {

      next(error)

    }

  }

  createReservation = async (req, res, next) => {
    try {

      const newReservation = await this.userService.createReservation(req.params.id, req.body)

      res.send('User reservation was created successfully')

    } catch (error) {
      next(error)
    }
  }

  update = async (req, res, next) => {
    try {

      const updatedUser = await this.userService.update(req.params.id, req.body)

      res.json(updatedUser)

    } catch (error) {

      next(error)
    }

  }

  delete = async (req, res, next) => {
    try {

      const deletedUser = await this.userService.delete(req.params.id)

      res.send('User deleted successfully')

    } catch (error) {
      next(error)
    }

  }

}

module.exports = UserControllers;