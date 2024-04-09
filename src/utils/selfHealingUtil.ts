import {Page, Locator} from "@playwright/test";
import logger from "../utils/LoggerUtils";

export default async function findValidElement(page:Page, locators: string[]):Promise<Locator | null>{
    let validElement: Locator | null = null;
    const TIMEOUT_MS = 5000;

    for(const locator of locators){
        try{
            const element = page.locator(locator);
            await element.waitFor({state: "attached", timeout:TIMEOUT_MS});
            validElement = element;
            logger.info(`Found valid element with locator: ${locator}`);
            break;
        
        }
        catch(error){
            logger.error(`Invalid locator: ${locator}`);
        }
    }

    if(!validElement){
        logger.error("All locators are invalid");
    }

    return validElement
}
