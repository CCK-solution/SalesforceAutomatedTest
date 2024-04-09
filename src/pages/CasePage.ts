import { Page } from "@playwright/test";
import logger from "../utils/LoggerUtils";
 

export default class CasePage{
    private readonly caseLink = "//a[contains(span/@title, 'Cases')]";
  private readonly newButtonLocator = "//ul[@class='slds-button-group-list']//li[@data-target-selection-name='sfdc:StandardButton.Case.NewCase']//button[@name='NewCase']";
  private readonly caseOriginDropdownLocator = "Case Origin - Current";
  private readonly caseProductDropdownLocator = "Product - Current Selection";
  private readonly caseTypeDropdownLocator = "Type - Current Selection: --";
  private readonly saveButtonLocator = "Save";
  private readonly contactFullNameLabelLocator = "sfa-output-name-with-hierarchy-icon-wrapper";


 

  constructor(private page: Page){

        
  }

  async createNewCaseFromContactDetailPage(caseOrigin: string, productName:string, caseType:string){
    // await this.page.getByLabel(this.caseLink).getByRole("button", { name: this.newButtonLocator }).click();
    console.log("----------****-------------------");
    logger.info(`${caseOrigin} ${productName} ${caseType}`);

    await this.page.locator(this.caseLink).click()
    logger.info("the case started to be created");

    await this.page.locator(this.newButtonLocator).last().click();
    
    await this.page.getByLabel(this.caseOriginDropdownLocator).click();
    await this.page
      .getByRole("option", { name: caseOrigin })
      .locator("span")
      .nth(1)
      .click();
    await this.page.getByLabel(this.caseProductDropdownLocator).click();
    await this.page
      .getByRole("option", { name: productName })
      .locator("span")
      .nth(1)
      .click();
    await this.page.getByLabel(this.caseTypeDropdownLocator).click();
    await this.page
      .getByRole("option", { name: caseType })
      .locator("span")
      .nth(1)
      .click();
    await this.page.getByRole("button", { name: this.saveButtonLocator, exact: true }).click();
  }

  

}

