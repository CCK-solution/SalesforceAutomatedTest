import {Page} from '@playwright/test';
import HomePage from './HomePage';

export default class Login{
    private readonly usernameInputSelector = "#username";
    private readonly passwordInputSelector = "#password";
    private readonly loginButtonSelector = "#Login";

    constructor(private page:Page){
         
    }

    async navigateToLoginPage(){
        await this.page.goto('/');
    }

    async fillUsername(username: string){
        await this.page.locator(this.usernameInputSelector).fill(username);
    }

    async fillPassword(password: string){
        await this.page.locator(this.passwordInputSelector).fill(password);
    }

    async clickLoginButton(){
        await this.page
            .locator(this.loginButtonSelector)
            .click()
            .catch((error)=>{
                console.error(`Error clicking login buttin: ${error}`);
                throw error // if error found is thrown
            })

            const homePage = new HomePage(this.page);
            return homePage;


    }
}
