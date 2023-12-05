const mongoose = require('mongoose');

const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('connected to mongoDB');
  } catch (error) {
    throw error;
  }
};

module.exports = mongoConnect;