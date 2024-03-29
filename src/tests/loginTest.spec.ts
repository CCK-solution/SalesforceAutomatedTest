import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
import {decrypt, encrypt } from "../utils/CryptojsUtils";
import {encryptEnvFile, descryptEnvFile} from "../utils/EncryptEnvFile";


test.skip("test", async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    // await loginPage.fillUsername(process.env.userid!); // is due to type constrainsts in typescript
    // await loginPage.fillPassword(process.env.password!);

    // encrypted value
    await loginPage.fillUsername(decrypt(process.env.userid!)); // is due to type constrainsts in typescript
    await loginPage.fillPassword(decrypt(process.env.password!));

    console.log(decrypt(process.env.userid!));
    console.log(decrypt(process.env.password!));

    // page chaning in playwright
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleTobeVisible();
})


test.skip("simple env test", async({page}) => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.userid);
    console.log(process.env.username);
    console.log(process.env.password);
})

test.skip("test encryption", async({page})=>{
    // const plaintext = "Hello, MAMA";
    // const encryptedText = encrypt(plaintext)
    // console.log('SALT:', process.env.SALT);
    // console.log('Encrypted:', encryptedText);
    // const decryptedText = decrypt(encryptedText);
    // console.log('Decrypted:', decryptedText);
    // console.log(decrypt(process.env.userid!));
    // console.log(decrypt(process.env.password!));


    encryptEnvFile();
})


//https://www.demoblaze.com/index.html 
test('login to demoblaze', async({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToEcomLogin();
    await loginPage.navigateToLoginLink();
    await loginPage.fillCredentials();
    await loginPage.clickLoginbutton();
    
})