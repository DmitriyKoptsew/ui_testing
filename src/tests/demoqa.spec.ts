import { RegistrationPage, user } from '../pages/student-registration-form-page';
import { apiTest } from '../api/api.fixture';
import { expect } from '@playwright/test';
import { checkColor } from '../utils/colorsChecker';
import { defaultColor, errorColor, successColor } from '../utils/colors';

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

test.describe('Регистрания пользователя', () => {
    test('Минимальное количество полей для регистрации', async ({ registrationPage }) => {
        await registrationPage.fillUserForm();
        await registrationPage.submitButton.click();
        await expect(registrationPage.successRegistrationModal).toBeVisible();
        await registrationPage.table.waitFor();
        const rows = await registrationPage.rows.all();
        const expectedValues = [
            { label: 'Student Name', value: user.firstName },
            { label: 'Student Email', value: user.email },
            { label: 'Gender', value: 'Male' },
            { label: 'Mobile', value: `${user.mobile}` },
            { label: 'Date of Birth', value: '14 October,2024' },
            { label: 'Subjects', value: '' },
            { label: 'Hobbies', value: '' },
            { label: 'Picture', value: 'picture.jpg' },
            { label: 'Address', value: '' },
            { label: 'State and City', value: '' },
        ];

        for (const row of rows) {
            const index = rows.indexOf(row);
            expect(await row.locator('td:nth-child(1)').textContent()).toContain(expectedValues[index].label);
            expect(await row.locator('td:nth-child(2)').textContent()).toContain(expectedValues[index].value);
        }


        // expect(await rows[0].locator('td:nth-child(2)').textContent()).toContain(user.firstName);
        // expect(await rows[3].locator('td:nth-child(2)').textContent()).toContain(user.mobile);
    });

    test('Проверка пустой формы', async ({ registrationPage }) => {
        await registrationPage.submitButton.click();
        await checkEmptyForm(registrationPage);
    });
});


async function checkEmptyForm(page: RegistrationPage) {
    await expect(page.firstNameInput).toBeEmpty();
    await expect(page.firstNameInput).toHaveAttribute('placeholder', 'First Name');
    await checkColor(page.firstNameInput, 'border-color', errorColor);

    await expect(page.lastNameInput).toBeEmpty();
    await expect(page.lastNameInput).toHaveAttribute('placeholder', 'Last Name');
    await checkColor(page.lastNameInput, 'border-color', errorColor);

    await expect(page.userEmailInput).toBeEmpty();
    await expect(page.userEmailInput).toHaveAttribute('placeholder', 'name@example.com');
    await checkColor(page.userEmailInput, 'border-color', successColor);

    await expect(page.maleRadio).not.toBeChecked();
    // await checkColor(page.maleRadio, 'border-color', errorColor);
    await expect(page.femaleRadio).not.toBeChecked();
    // await checkColor(page.femaleRadio, 'border-color', errorColor);
    await expect(page.otherRadio).not.toBeChecked();
    // await checkColor(page.otherRadio, 'border-color', errorColor);

    await expect(page.dateOfBirthInput).toHaveValue('14 Oct 2024');
    await checkColor(page.dateOfBirthInput, 'border-color', successColor);

    await expect(page.subjectsInput).toHaveValue('');
    await checkColor(page.subjectsInput, 'border-color', defaultColor);

    await expect(page.sportsCheckbox).not.toBeChecked();
    // await checkColor(page.sportsCheckbox, 'border-color', successColor);

    await expect(page.readingCheckbox).not.toBeChecked();
    // await checkColor(page.readingCheckbox, 'border-color', successColor);

    await expect(page.musicCheckbox).not.toBeChecked();
    // await checkColor(page.musicCheckbox, 'border-color', successColor);

    await expect(page.uploadPictureButton).toBeEnabled();
    await expect(page.uploadPictureButton).toBeVisible();

    await expect(page.currentAddressInput).toBeEmpty();
    await expect(page.currentAddressInput).toHaveAttribute('placeholder', 'Current Address');
    await checkColor(page.userEmailInput, 'border-color', successColor);

    await expect(page.stateSelect).toBeEnabled();
    // await expect(page.citySelect).toBeDisabled();

}