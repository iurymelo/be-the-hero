const crypto = require('crypto')

const generateUniqueId = () => {
  const id = crypto.randomBytes(4).toString('HEX');
  return id;
};

module.exports = generateUniqueId;
