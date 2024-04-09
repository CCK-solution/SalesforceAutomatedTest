import {test} from '../fixtures/loginFixture';

test("Fixtures test", async ({homePage}) => {
    await homePage.expectServiceTitleTobeVisible();
})