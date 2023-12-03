const { User, UserSchema } = require('./models/user')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
}

module.exports = setupModels