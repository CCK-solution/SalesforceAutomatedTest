import {Page} from '@playwright/test';
import HomePage from './HomePage';
import logger from '../utils/LoggerUtils'

export default class Login{
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

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
}
