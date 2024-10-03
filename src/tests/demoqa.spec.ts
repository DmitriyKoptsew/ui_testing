import { RegistrationPage, user } from '../demoqa/student-registration-form-page';
import { apiTest } from '../api/api.fixture';
import { expect } from '@playwright/test';

// const {test, expect} = require("@playwright/test");

const test = apiTest.extend<{ registrationPage: RegistrationPage }>({
    registrationPage: async ({ page }, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },
});

test.beforeEach(async ({ registrationPage }) => {
    await registrationPage.goto();
});

test.describe('Регистрация', () => {
    test('Открытие страницы регистрации', async ({ registrationPage }) => {
        await expect(registrationPage.page).toHaveTitle('DEMOQA');
    });

    test('Заполнение формы регистрации', async ({ registrationPage }) => {
        await registrationPage.fillMinimumUserForm();
        await expect(registrationPage.firstNameInput).toHaveValue(user.firstName);
        await expect(registrationPage.lastNameInput).toHaveValue(user.lastName);
    });

    test('Отправка формы регистрации', async ({ registrationPage }) => {
        await registrationPage.fillMinimumUserForm();
        await registrationPage.submitButton.click();
        await expect(registrationPage.successRegistrationModal).toBeVisible();
    });

    test('Проверка сброса формы', async ({ registrationPage }) => {
        await registrationPage.fillMinimumUserForm();
        await registrationPage.goto();
        await expect(registrationPage.firstNameInput).toBeEmpty();
        await expect(registrationPage.lastNameInput).toBeEmpty();
        await expect(registrationPage.userEmailInput).toBeEmpty();
    });

    test('Проверка работы модального окна после отправки формы', async ({ registrationPage }) => {
        await registrationPage.fillMinimumUserForm();
        await registrationPage.submitButton.click();
        await expect(registrationPage.successRegistrationModal).toBeVisible();
        await registrationPage.closeLargeModal.click();
        await expect(registrationPage.successRegistrationModal).not.toBeVisible();
    });

    test('Проверка работы страницы после регистрации', async ({ registrationPage }) => {
        await registrationPage.fillMinimumUserForm();
        await registrationPage.submitButton.click();
        await expect(registrationPage.successRegistrationModal).toBeVisible();
        await registrationPage.closeLargeModal.click();
        await expect(registrationPage.page).toHaveTitle('DEMOQA');
    });
});