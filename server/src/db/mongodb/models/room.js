const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
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
    type: String,
    required: true
  },
  unavailableDates: {
    type: [ Date ]
  }
})

module.exports = mongoose.model('Room', roomSchema);