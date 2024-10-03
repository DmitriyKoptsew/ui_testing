import { PageObject } from '../pages/pageObject';
import { Routes } from '../utils/routes';
import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';

export const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    mobile: faker.number.int({ min: 1000000000, max: 9999999999 }),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
    subjects: faker.lorem.words(10),
    currentAddress: faker.lorem.words(10),
};

export class RegistrationPage extends PageObject {
    readonly userForm = this.get('userForm');
    readonly firstNameInput = this.get('firstName');
    readonly lastNameInput = this.get('lastName');
    readonly userEmailInput = this.get('userEmail');
    readonly maleRadio = this.get('gender-radio-1');
    readonly femaleRadio = this.get('gender-radio-2');
    readonly otherRadio = this.get('gender-radio-3');
    readonly userNumberInput = this.get('userNumber');
    readonly dateOfBirthInput = this.get('dateOfBirthInput');
    readonly subjectsInput = this.get('subjectsInput');
    readonly sportsCheckbox = this.get('hobbies-checkbox-1');
    readonly readingCheckbox = this.get('hobbies-checkbox-2');
    readonly musicCheckbox = this.get('hobbies-checkbox-3');
    readonly addressInput = this.get('currentAddress');
    readonly stateSelect = this.get('react-select-3-input');
    readonly citySelect = this.get('react-select-4-input');
    readonly submitButton = this.get('submit');
    readonly closeLargeModal = this.get('closeLargeModal');
    readonly successRegistrationModal = this.locator('[class*="modal-content"]');

    constructor(page: Page) {
        super(page);
    }

    async goto() {
        if (!Routes.registrationForm) {
            throw new Error('Routes.registrationForm is empty or null');
        }
        await this.page.goto(Routes.registrationForm, { waitUntil: 'domcontentloaded', timeout: 0 });
        await this.userForm.waitFor();
    }

    async fillMinimumUserForm() {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.maleRadio.click({ force: true });
        await this.userNumberInput.fill(String(user.mobile));
    }
}