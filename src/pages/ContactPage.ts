import {Page, expect} from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default class ContactPage{
   
    private readonly contactLink = "Contacts";
    private readonly newButtonLocator = "New";
    private readonly firstNameTextFieldLocator = "First Name";
    private readonly lastNameTextFieldLocator = "Last Name";
    private readonly saveButtonLocator = "Save";
    private readonly contactFullNameLabelLocator = "sfa-output-name-with-hierarchy-icon-wrapper";

    constructor(private page: Page){

        
    }

    async createNewContact(fname: string, lname:string){
        await this.page.getByRole("button", {name: this.newButtonLocator}).click();
        logger.info("New button is clicked");
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).click();
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).fill(fname);
        logger.info(`First name is filled as ${fname}`);
        await this.page.getByPlaceholder(this.firstNameTextFieldLocator).press('Tab');
        await this.page.getByPlaceholder(this.lastNameTextFieldLocator).fill(lname);
        logger.info(`Last Name is filled as ${lname}`)
        await this.page.getByRole('button', {name: this.saveButtonLocator, exact:true}).click().catch((error) => {
            logger.error(`Error clicking save button ${error}`);
            throw error;
        }).then(() => logger.info("save button is clicked"));
    }

    async expectContactLabelContainsFirstNameAndLastName(fname: string, lname:string){
        await expect(this.page.locator(this.contactFullNameLabelLocator)).toContainText(`${fname} ${lname}`);
        logger.info(`New contact created and ${fname} ${lname} is visible`);
        await this.page.getByRole('link', { name: this.contactLink }).click();
        logger.info('contacts tab is clicked');
        
        
    }


}