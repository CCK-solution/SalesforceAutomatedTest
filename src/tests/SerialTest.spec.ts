import {test, Page} from '@playwright/test';
import LoginPage from "../pages/LoginPage";
import logger from "../utils/LoggerUtils";
import { decrypt } from "../utils/CryptojsUtils";
import ContactPage from "../pages/ContactPage";
import testdata from "../data/contactCaseFlow.json";
import CasePage from "../pages/CasePage";
import homePage from '../pages/HomePage';

test.describe.configure({mode: 'serial'});

let page: Page;


// Define a beforeall hook to setio the browser context

test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    const loginPage = new LoginPage(page);
    const homePage = await loginPage.quickLogin(decrypt(process.env.userid!),decrypt(process.env.password!));
    // await homePage.expectServiceTitleTobeVisible();
    logger.info("login is completed");
});
  
test("Create Contact and Open", async () => {
    const contactpage = new ContactPage(page);
    await contactpage.navigateToContactTab();
    await contactpage.createNewContact(testdata.contactFName,testdata.contactLName);
    await contactpage.expectContactLabelContainsFirstNameAndLastName(testdata.contactFName,testdata.contactLName);
    logger.info("the contact discovery ended.....");
    await contactpage.findExistingContactByLastName(testdata.contactLName);
    logger.info("the contact have been found");
});
  
test("Create Case Test", async () => {
    const casePage = new CasePage(page);
    console.log("------------ start creating case");
    logger.info("starting to create a case");
    await casePage.createNewCaseFromContactDetailPage(testdata.caseOrigin,testdata.caseProduct,testdata.caseType);
});
  
test.afterAll(async () => {
    await page.close();
  });
  