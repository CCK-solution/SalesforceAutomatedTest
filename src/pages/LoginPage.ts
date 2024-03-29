import {Page, expect} from '@playwright/test';
import HomePage from './HomePage';
import logger from '../utils/LoggerUtils';
import {decrypt, encrypt } from "../utils/CryptojsUtils";

export default class Login{
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    // an other login process
    private readonly loginButton = '#login2';
    private readonly usernameInput = '#loginusername';
    private readonly passwordInput = '#loginpassword';
    private readonly loginSubmitButton = '//button[normalize-space()="Log in"]';
    private readonly logoutButton = '#logout2';
 

    constructor(private page:Page){
         
    }

    async navigateToLoginPage(){
        await this.page.goto('/');
        logger.info("Navigated to login.salesforce.com");
    }

    async fillUsername(username: string){
        await this.page.locator(this.usernameInputSelector).fill(username);
        logger.info("UserName has been filled");
    }

    async fillPassword(password: string){
        await this.page.locator(this.passwordInputSelector).fill(password);
        logger.info("Password has been filled");
    }

    async clickLoginButton(){
        await this.page
            .locator(this.loginButtonSelector)
            .click()
            .catch((error)=>{
                logger.error(`Error clicking login button:${error}`);
                console.error(`Error clicking login buttin: ${error}`);
                throw error // if error found is thrown
            })
            .then(() => logger.info("clicked login button"));

            //page chaining
            const homePage = new HomePage(this.page);
            return homePage;


    }

    async navigateToEcomLogin(){
        await this.page.goto('https://www.demoblaze.com/index.html')
    }

    async navigateToLoginLink(){
        await this.page.locator(this.loginButton).click();
    }

    async fillCredentials(){
        await this.page.locator(this.usernameInput).fill(decrypt(process.env.email!));
        await this.page.locator(this.passwordInput).fill(decrypt(process.env.pwd!));
        logger.info("credentials have been filled up ");
    }

    async clickLoginbutton(){
        await this.page.locator(this.loginSubmitButton).click();
        await expect(this.page).toHaveTitle('STORE');
        logger.info("user has loggin ");
    }
}
