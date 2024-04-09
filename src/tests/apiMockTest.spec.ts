import {test, expect} from "@playwright/test";
import logger from "../utils/LoggerUtils";

test.skip("API Monitoring test", async({page}) => {
    page.on("request", (request) => {
        logger.info(`request Url is ${request.url}`);
        logger.info(`request method is ${request.method}`);
        logger.info(
            `request headers are ${JSON.stringify(request.headers(), null, 2)}`
        );
    })

    page.on('response', (response) => {
        logger.info(`response ${response.status()}`);
    });

    await page.goto("/");
})


test.skip('API intercepting test', async ({page}) => {

    // enable request interception
    await page.route("**/*", (route) => {

        //ger the original headers
        const headers = route.request().headers();

        //Add a custom header
        headers["X-Custom-header"] = 'integration-check';
        console.log(headers);

        route.continue({headers});
    });

    page.on('request', request =>{
        logger.info(`Modified request headers ${JSON.stringify(request.headers(), null, 2)}
                    Modified request types is ${request.method}`)
    })

    await page.goto('/');
    await page.waitForLoadState('networkidle');
})


test('API Mocking test', async ({page}) => {
    page.route("https://demo.playwright.dev/api-mocking/api/v1/fruits",
    async(route) => {
        const json = [
            {name: "Mandarin", id:3},
            {name: "Tangerine", id:1},
            {name: "Clementines", id:5}
        ];
        await route.fulfill({json});
    });

    await page.goto("https://demo.playwright.dev/api-mocking");
    await page.waitForLoadState('networkidle');
})