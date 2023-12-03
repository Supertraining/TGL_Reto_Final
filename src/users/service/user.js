const bcryptHandle = require('../../utils/bcrypt.handle')

class UserServices {

  constructor (models){
    this.models = models
  }

  async getAll() {
    try {

      const users = await this.models.Users.findAll();
      return users

    } catch (error) {

      throw error

    }

  }

  async getById(id) {
    try {

      const user = await this.models.Users.findByPk(id)
      return user

    } catch (error) {

    }

  }

  async login(username, password) {

    try {

      const user = await thhis.models.Users.findOne({
        where: {
          username,
        }
      });
      const passwordMatch = await bcryptHandle.verifyPassword(password, user.password)
      if (!user || !passwordMatch) {
        throw new Error('Wrong username or password')
      }

      return user;

    } catch (error) {

      throw new Error(error.message)

    }

  }

  async register(username, password, role) {

    try {

      const hashedPass = await bcryptHandle.encrypt(password)
      const newUser = await this.models.Users.create({
        username: username,
        password: hashedPass,
        role: role
      })
      return newUser

    } catch (error) {

      throw error

    }

  }

  async update(id, data) {
    try {
      const user = await this.models.Users.findByPk(id)
      if (!user) {
        return user
      }
      const updatedUser = await this.models.Users.update(data, {
        where: {
          id: user.id,
        },
      });

      return updatedUser

    } catch (error) {

      throw error

    }

  }

  async delete(id) {
    try {

      const deletedUser = await this.models.Users.destroy({
        where: {
          id: id,
        },
      });
      return deletedUser

    } catch (error) {

      throw error

    }

  }

}

module.exports = UserServices