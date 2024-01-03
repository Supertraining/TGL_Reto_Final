const mongoose = require('mongoose')

const mainRoomSchema = new mongoose.Schema({
  thumbnail: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: Object,
    required: true
  }
})

module.exports = mongoose.model('mainRoom', mainRoomSchema);