let CryptoJSUtil = require('crypto-js');
let fs = require("fs");
let path = require("path");


const SALT = process.env.SALT || 'defaultSalt';
const currentDir = __dirname;

const srcDir = path.resolve(currentDir, "..");

// change to 'config' folder
const configDir = path.resolve(srcDir, "config");
const envFilePath = `${configDir}\\.env`;
if(process.env.NODE_ENV){
    const envFilePath = `${configDir}\\.env.${process.env.NODE_ENV}`;
}

console.log(envFilePath);

export function encryptEnvFile(){
    //read the .env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    //encrypt values and update the array
    const encryptedLines = envLines.map((line) => {
        const [key, value] = line.split("=");
        
        if(value){
            const encryptedValue = CryptoJSUtil.AES.encrypt(value, SALT).toString();
            return `${key}=${encryptedValue}`
        }
        return line;
    });

    // join the line and write back to the env file
    const updatedEnvContent = encryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

    console.log("Encryption completed. Upated .env file.");

}

export function descryptEnvFile(){
    //read env file
    const envFileContent = fs.readFileSync(envFilePath, "utf8");
    const envLines = envFileContent.split("\n");

    // Encrypt values and update the array
    const decryptedLines = envLines.map((line) => {
        const [key, value] = line.split("=");

        if(value){
            const decryptedVvalue = CryptoJSUtil.AES.decrypt(value, SALT).toString(
                CryptoJSUtil.enc.Utf8
            )
            return line;
        }
    });

    //join the lines and write back to the .env fine
    const updatedEnvContent = decryptedLines.join("\n");
    fs.writeFileSync(envFilePath, updatedEnvContent, "utf8");

    console.log("Decrypted completed. updated .env file");
}
