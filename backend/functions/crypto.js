const CryptoJS = require("crypto-js");

const secretKey = "cryptoJS123";

const encryptMessage = (message) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(message, secretKey);
    return ciphertext.toString();
  } catch (error) {
    throw error;
  }
};

const decryptMessage = (encryptedMessage) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  } catch (error) {
    throw error;
  }
};

module.exports = { encryptMessage, decryptMessage };
