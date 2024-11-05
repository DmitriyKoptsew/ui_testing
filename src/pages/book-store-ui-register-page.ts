import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';
import { PageObject } from '../pages/pageObject';
import { Routes } from '../utils/routes';
import { uploadFile } from '../utils/fileUploader';


export const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userName: faker.internet.userName(),
    password: faker.internet.password(),
};

export class StoreRegistrationPage extends PageObject {
    readonly userForm = this.get('userForm');
    readonly firstNameInput = this.get('firstname');
    readonly lastNameInput = this.get('lastname');
    readonly userNameInput = this.get('userName');
    readonly passwordInput = this.get('password');
    readonly registerButton = this.get('register');
    readonly backButton = this.get('gotologin');
    readonly captchaCheckbox = this.get('recaptcha-anchor');
    readonly captcha = this.get('rc-anchor-container');


    constructor(page: Page) {
        super(page);
    }

    async goto() {
        if (!Routes.bookStoreRegister) {
            throw new Error('Routes.bookStoreRegister is empty or null');
        }
        await this.page.goto(Routes.bookStoreRegister, { waitUntil: 'domcontentloaded', timeout: 0 });
        await this.userForm.waitFor();
    }

    async fillRegisterForm() {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.userNameInput.fill(user.userName);
        await this.passwordInput.fill(user.password);
    }
}