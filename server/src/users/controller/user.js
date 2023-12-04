const jwtHandle = require('../../utils/jwt.handle')

class UserControllers {

  constructor(productService) {
    this.productService = productService
  }
  getAll = async (req, res) => {
    try {

      const users = await this.productService.getAll()
      users.length === 0
        ? res.status(204).send()
        : res.status(200).json(users)

    } catch (error) {
      console.log(error)
      res.status(500).send('Internal server error')
    }

  }

  getById = async (req, res) => {
    try {

      const user = await this.productService.getById(req.params.id)
      !user
        ? res.status(404).send('User not found')
        : res.status(200).json(user)

    } catch (error) {
      console.log(error)
      res.status(500).send('Internal server error')
    }

  }

  login = async (req, res) => {
    try {

      const { username, password } = req.body

      const user = await this.productService.login(username, password)
      if (!user) {
        res.status(400).send('Bad Request')
        return
      }

      const token = await jwtHandle.createToken({ id: user.id, username: user.username, role: user.role })
      
      res.send(token)

    } catch (error) {

      console.log(error)
      res.status(500).send('Internal server error')

    }

  }

  register = async (req, res) => {
    try {

      const { username, password, role } = req.body
      const registeredUser = await this.productService.register(username, password, role)
      !registeredUser
        ? res.status(401).send('Bad request')
        : res.status(201).json(registeredUser)

    } catch (error) {

      console.error(error)
      res.status(500).send('Internal server error')

    }

  }

  update = async (req, res) => {
    try {

      const updatedUser = await this.productService.update(req.params.id, req.body)
      !updatedUser
        ? res.status(404).send('User not found')
        : res.send('User updated')

    } catch (error) {
      console.error(error)
      res.status(500).send('Internal server error')
    }

  }

  delete = async (req, res) => {
    try {

      const deletedUser = await this.productService.delete(req.params.id)
      !deletedUser
        ? res.status(404).send('User not found')
        : res.send('User deleted successfully')
    } catch (error) {
      console.error(error)
      res.status(500).send('Internal server error')
    }

  }

}

module.exports = UserControllers;