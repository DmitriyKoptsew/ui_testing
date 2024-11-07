import { RegistrationPage, user } from '../pages/student-registration-form-page';
import { apiTest } from '../api/api.fixture';
import { expect } from '@playwright/test';
import { checkColor } from '../utils/colorsChecker';
import { defaultColor, errorColor, successColor } from '../utils/colors';
import { StoreRegistrationPage } from '../pages/book-store-ui-register-page';


const test = apiTest.extend<{ storeRegistrationPage: StoreRegistrationPage }>({
    storeRegistrationPage: async ({ page }, use) => {
        const storeRegistrationPage = new StoreRegistrationPage(page);
        await use(storeRegistrationPage);
    },
});

test.beforeEach(async ({ storeRegistrationPage }) => {
    test.setTimeout(60000);
    await storeRegistrationPage.goto();
});

test.describe('Регистрания пользователя', () => {
    test('3. Проверка формы регистрации', async ({ storeRegistrationPage }) => {
        await storeRegistrationPage.fillRegisterForm();
        await storeRegistrationPage.captcha.isVisible();
        const captchaInput = await storeRegistrationPage.page.$('input[name="g-recaptcha-response"]');
        // await captchaInput.type('solution');

        // await storeRegistrationPage.captchaCheckbox.check();
        // await storeRegistrationPage.registerButton.click();
        // await storeRegistrationPage.page.waitForTimeout(5000);
        // await storeRegistrationPage.page.on('dialog', async (dialog) => {
        //     expect(dialog.type()).toBe('alert');
        //     expect(dialog.message()).toBe('Ожидаемое сообщение');
        // });
    });

    // test('2. Проверка пустой формы', async ({ registrationPage }) => {
    //     await registrationPage.submitButton.click();
    //     await checkEmptyForm(registrationPage);
    // });
});

