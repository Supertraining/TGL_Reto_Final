const bcrypt = require('bcrypt');

module.exports = {

  encrypt : async (password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  },

  verifyPassword : async (password, passwordHash) => {
    const isCorrect = await bcrypt.compare(password, passwordHash);
    return isCorrect;
  }
}

