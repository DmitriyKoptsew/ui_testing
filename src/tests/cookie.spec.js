const {test, expect} = require("@playwright/test");
test.describe('Test', () => {
    test('Test', async ({ page }) => {
        await page.goto('https://orteil.dashnet.org/cookieclicker/');
        await page.waitForTimeout(10000);
    });
})