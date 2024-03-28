import {test} from "@playwright/test";
import LoginPage from "../pages/LoginPage"


test("test", async({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername("nicolasbahindwa@gmail.com");
    await loginPage.fillPassword("@jamesrola#1991");

    // page chaning in playwright
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleTobeVisible();
})