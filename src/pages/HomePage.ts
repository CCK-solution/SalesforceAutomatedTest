import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtils";
import ContactPage from "./ContactPage";

export default class HomePage{
    // private readonly serviceTitleLocator = "Service";
    private readonly serviceTitleLocator = "Setup";
    private readonly contactsLinkLocator = "Contacts";

    private readonly AppLuncherLink = ".slds-icon-waffle";
    private readonly ServicesLink = '//a[@id="07pIU000000sZC8YAM"]';

    constructor(private page: Page) {
    }

    async expectServiceTitleTobeVisible(){
        await expect(this.page.getByTitle(this.serviceTitleLocator)).toBeVisible({timeout:15000})
        .catch((error) => {
            logger.error(`Error clicking login button:${error}`);
        })
        .then(() => logger.info("Service title is visible"));
    }

    async navigateToContactTab(){
        await this.page.locator(this.AppLuncherLink).click();
        await this.page.locator(this.ServicesLink).click();
        await expect(this.page.getByRole('link', {name: this.contactsLinkLocator})).toBeVisible();
        logger.info("Contants Tab is visible")
        await this.page.getByRole("link", {name: this.contactsLinkLocator}).click();
        logger.info("contacts Tab is clicked");
        return new ContactPage(this.page);
    }
}