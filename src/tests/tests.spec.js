// import {test, expect} from "@playwright/test";
const { test, expect } = require('@playwright/test');

test.describe('has title', () => {
    test('has title', async ({ page }) => {
        await page.goto('https://playwright.dev/');
        await expect(page).toHaveTitle(/Playwright/);
    });
})
