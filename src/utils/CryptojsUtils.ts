// cryptoJS library need to be installed

let CryptoJSUtil = require("crypto-js");


// get the SALT from the system environment variable
const SALT = process.env.SALT || "defaultSalt"


// Encryption function
export function encrypt(text: string){
    const cipherText = CryptoJSUtil.AES.encrypt(text, SALT).toString();
    return cipherText;
}

// Decrypt function
export function decrypt(cipherText: string){
    const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
    const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
    return originalText;
}