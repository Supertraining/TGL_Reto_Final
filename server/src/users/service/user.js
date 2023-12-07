const bcryptHandle = require('../../utils/bcrypt.handler')
const createError = require('../../utils/error.creator')
class UserServices {

  constructor(models) {
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

      const user = await this.models.Users.findOne({
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

  async register(userData) {

    try {
      const { fullname, username, password, role } = userData
      const hashedPass = await bcryptHandle.encrypt(password)
      const newUser = await this.models.Users.create({
        fullname: fullname,
        username: username,
        password: hashedPass,
        role: role
      })
      return newUser

    } catch (error) {

      throw error

    }

  }

  async createReservation(id, reservationData) {

    try {

      const user = await this.models.Users.findByPk(id);

      if (!user) {

        let error = createError(404, 'User not found')
        throw error
      }

      const existingReservations = user.myReservations.filter(reservation =>
        reservation.reservationDates.some(date =>
          reservationData.reservationDates.includes(date)
        )
      );

      if (existingReservations.length > 0) {
        let error = createError(400, 'You already have reservations on those Dates')
        throw error
      }

      user.myReservations.push(reservationData);

      await this.models.Users.update(
        { myReservations: user.myReservations },
        { where: { id: user.id } }
      );

      return user.myReservations;

    } catch (error) {
      throw error;
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