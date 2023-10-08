const CryptoJS = require("crypto-js");

const secretKey = "cryptoJS123";

const decryptMessage = (encryptedMessage) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, secretKey);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
console.log(decryptedMessage)  
} catch (error) {
    throw error;
  }
};

const encryptMessage = (message) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(message, secretKey);
    console.log(ciphertext.toString()) ;
  } catch (error) {
    throw error;
  }
};
encryptMessage("ADMINadmin123")