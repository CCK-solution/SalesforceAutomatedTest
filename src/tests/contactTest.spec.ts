import { test } from "@playwright/test";
import { decrypt } from "../utils/CryptojsUtils";
import logger from "../utils/LoggerUtils";
import LoginPage from "../pages/LoginPage";
import cdata from "../data/contacts.json"




test.skip("simple contact test", async({page}) => {
    logger.info("Test for contact creation is started...");
    const fname = 'nicolas';
    const lname = 'bahindwa';
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.fillUsername(decrypt(process.env.userid!));
    await loginPage.fillPassword(decrypt(process.env.password!));
    const homePage = await loginPage.clickLoginButton();
    await homePage.expectServiceTitleTobeVisible();

    //
    const contactPage = await homePage.navigateToContactTab();
    await contactPage.createNewContact(fname, lname);
    await contactPage.expectContactLabelContainsFirstNameAndLastName(
        fname,
        lname
    );
    logger.info("text for contact creation os completed");
});

for(const contact of cdata){
    test(`using test Data contact test${contact.firstName}`, async({page}) => {
        logger.info("Test for contact creation is started...");
        const fname = 'nicolas';
        const lname = 'bahindwa';
        const loginPage = new LoginPage(page);
        await loginPage.navigateToLoginPage();
        await loginPage.fillUsername(decrypt(process.env.userid!));
        await loginPage.fillPassword(decrypt(process.env.password!));
        const homePage = await loginPage.clickLoginButton();
        await homePage.expectServiceTitleTobeVisible();
    
        //
        const contactPage = await homePage.navigateToContactTab();
        await contactPage.createNewContact(contact.firstName, contact.lastName);
        await contactPage.expectContactLabelContainsFirstNameAndLastName(
            contact.firstName,
            contact.lastName
        );
        logger.info("text for contact creation os completed");
    });
}