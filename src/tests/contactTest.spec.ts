import { test } from "@playwright/test";
import { decrypt } from "../utils/CryptojsUtils";
import logger from "../utils/LoggerUtils";
import {demoOutput} from '../utils/fakersample';
import {exportToJson, exportToCsv, generateTestData} from '../utils/FakerDataUtil';
import LoginPage from "../pages/LoginPage";
import cdata from "../data/contacts.json";
import {convertCsvFileToJsonFile} from "../utils/CsvtoJsonUtil";



test("simple contact test", async({page}) => {
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
    test.skip(`using test Data contact test${contact.firstName}`, async({page}) => {
        logger.info("Test for contact creation is started...");
        // const fname = 'nicolas';
        // const lname = 'bahindwa';
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


test.skip('csv to json conversion', async() => {
    convertCsvFileToJsonFile("data.csv", "datademo.json");
})


test.skip("generate fake sample data", async({page}) => {
    console.log(demoOutput);
})


test.skip("Faker test data", async({page}) => {
    //generatte test data
    const testData = generateTestData(20);

    // data to JSON fil//
    exportToJson(testData, 'testData_en.json');

    //export data to csv file
    exportToCsv(testData, 'testData_en.csv');
})