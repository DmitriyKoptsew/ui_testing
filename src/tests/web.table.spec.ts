import { apiTest } from '../api/api.fixture';
import { expect } from '@playwright/test';
import { WebTablePage, user } from '../pages/web-tables-page';
import { faker } from '@faker-js/faker';

const test = apiTest.extend<{ webTablePage: WebTablePage }>({
    webTablePage: async ({ page }, use) => {
        const webTablePage = new WebTablePage(page);
        await use(webTablePage);
    },
});

test.beforeEach(async ({ webTablePage }) => {
    await webTablePage.goto();
});

test.describe('Добавление строки, выбор количества строк', () => {
    test('3 Добавление строки', async ({ webTablePage }) => {
        await webTablePage.addUser();
        await expect(webTablePage.tableGrid).toContainText(user.firstName);
        await webTablePage.editRecord.click();
        await expect(webTablePage.firstNameInput).toHaveValue(user.firstName);
    });

    test('4 Выбор количества строк в таблице', async ({ webTablePage }) => {
        const options = ['5', '10', '20', '25', '50', '100'];
        for (const option of options) {
            await webTablePage.selectRows.selectOption(option);
            const rows = webTablePage.tableGrid.locator('.rt-tr');
            const filledRows = rows.filter();
            await expect(filledRows).toHaveCount(parseInt(option));
        }
    });
});

test.describe('Редактирование и поиск строки', () => {
    let webTablePage: WebTablePage;

    test.beforeEach(async ({ webTablePage: page }) => {
        webTablePage = page;
        await webTablePage.goto();
        await webTablePage.addUser();
    });

    test.afterEach(async () => {
        await webTablePage.deleteUser();
    });

    test('5 Редактирование строки', async ({ webTablePage }) => {
        const updatedUser = {
            ...user,
            firstName: faker.lorem.word(),
            lastName: faker.lorem.word(),
        };

        await webTablePage.editRecord.click();
        await webTablePage.fillUser(updatedUser);
        await webTablePage.submitButton.click();
        await expect(webTablePage.tableGrid).toContainText(updatedUser.firstName);
        await webTablePage.editRecord.click();
        await expect(webTablePage.firstNameInput).toHaveValue(updatedUser.firstName);
        await webTablePage.submitButton.click();
    });

    test('6 Поиск строки', async ({ webTablePage }) => {
        await webTablePage.searchInput.fill(user.firstName);
        await expect(webTablePage.tableGrid).toContainText(user.firstName);
        const rows = webTablePage.tableGrid.locator('.rt-tr');
        const filteredRows = rows.filter({ hasText: user.firstName });
        await expect(filteredRows).toHaveCount(1);
    });
});

test.describe('Удаление строки', () => {
    let webTablePage: WebTablePage;

    test.beforeEach(async ({ webTablePage: page }) => {
        webTablePage = page;
        await webTablePage.goto();
        await webTablePage.addUser();
    });

    test('7 Удаление строки', async ({ webTablePage }) => {
        await webTablePage.deleteRecord.click();
        await expect(webTablePage.tableGrid).not.toContainText(user.firstName);
    });
});

test.describe('Пагинация', () => {
    let webTablePage: WebTablePage;
    test.beforeEach(async ({ webTablePage: page }) => {
        webTablePage = page;
        await webTablePage.goto();
        for (let i = 0; i < 8; i++) {
            await webTablePage.addUser();
        }
    });

    test('8 Следующая страница', async ({ webTablePage }) => {
        await expect(webTablePage.totalPages).toContainText('2');
        // await expect(webTablePage.previousPage).toBeDisabled();
        await webTablePage.nextPage.click();
        await expect(webTablePage.selectedPage).toHaveValue('2');
        // await expect(webTablePage.nextPage).toBeDisabled();
        // await expect(webTablePage.previousPage).toBeEnabled();
    });

    test('9 Предыдущая страница', async ({ webTablePage }) => {
        await expect(webTablePage.totalPages).toContainText('2');
        // await expect(webTablePage.previousPage).toBeDisabled();
        await webTablePage.nextPage.click();
        await webTablePage.previousPage.click();
        await expect(webTablePage.selectedPage).toHaveValue('1');
        // await expect(webTablePage.nextPage).toBeDisabled();
        // await expect(webTablePage.previousPage).toBeEnabled();
    });

    test('10 Перейти на конкретную страницу', async ({ webTablePage }) => {
        await expect(webTablePage.totalPages).toContainText('2');
        await webTablePage.selectedPage.fill('2');
        await webTablePage.page.press( 'input', 'Enter');
        await expect(webTablePage.selectedPage).toHaveValue('2');
    });
});


