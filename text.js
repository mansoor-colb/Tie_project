const crypto = require('crypto');

// Generate a random six-digit number
const getRandomNumber = () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};

const randomSixDigitNumber = 'Anaie@123';
console.log('Random Number:', randomSixDigitNumber);

// Encryption
  
const secretKey = '99809933334455667788990099887766';  // Replace with your secret key
const iv = crypto.randomBytes(16); // Initialization Vector
const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);

let encryptedData = cipher.update(randomSixDigitNumber.toString(), 'utf-8', 'hex');
encryptedData += cipher.final('hex');
console.log('Encrypted:', encryptedData);

// Decryption
const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), iv);

let decryptedData = decipher.update("52c6e23b9a41d421d5c922b35013d443", 'hex', 'utf-8');
decryptedData += decipher.final('utf-8');
console.log('Decrypted:', decryptedData);
