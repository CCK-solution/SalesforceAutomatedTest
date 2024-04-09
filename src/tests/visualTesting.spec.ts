import {test, expect} from "@playwright/test";
import LoginPage from "../pages/LoginPage";
test("verify logo placement and size", async ({page}) => {
    await page.goto("/");

    const logo = await page.getByAltText("salesforce");
    const boundingBox = await logo?.boundingBox();
    const expectedWidthInPixels =  160.890625; // Replace with your expected width in pixels
    const expectedHeightInPixels = 112.984375; // Replace with your expected height in pixels


    if(boundingBox){
        expect(boundingBox.width).toBe(expectedWidthInPixels);
        expect(boundingBox.height).toBe(expectedHeightInPixels);
    }
});


test("Confirm logo color", async({page}) => {
    await page.goto("/");
    const logo = await page.getByAltText("salesforce");

    // get the computed style of the button
    const logoStyle = await logo.evaluate((element) => {
        const style = window.getComputedStyle(element);
        return{
            color: style.color,
        };
    });
    
    //assert the background color of the button
    expect(logoStyle.color).toBe("rgb(22, 50, 92)");
    //replace with your expected background clor
})


test('Screenshots', async ({ page }) => {
    // Navigate to the page
    await page.goto('/');

    const loginPage = new LoginPage(page);
    await loginPage.fillUsername("demo");
    
    // Set the viewport size to ensure consistent screenshot size
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Take a screenshot
    await page.waitForTimeout(5000);
    const screenshot = await page.screenshot();
    
    // Compare the screenshot with the snapshot
    expect(screenshot).toMatchSnapshot();
});
