const bcrypt = require("bcrypt");

const encrypt = async (password) => {
  try {
    const saltRounds = 10; // Number of rounds to make hashing computationally expensive
    const encrypt = await bcrypt.hash(password, saltRounds);
    return encrypt;
  } catch (error) {
    throw error;
  }
};

const decrypt = async (password, hashedPassword) => {
  try {
    // Compare the provided password with the hashed password
    const decrypt = await bcrypt.compare(password, hashedPassword);
    return decrypt;
  } catch (error) {
    throw error;
  }
};

module.exports = { encrypt, decrypt };
