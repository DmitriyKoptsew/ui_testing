import { faker } from '@faker-js/faker';
import { Page } from '@playwright/test';
import { PageObject } from '../pages/pageObject';
import { Routes } from '../utils/routes';

export const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int(),
    salary: faker.number.int(),
    department: faker.lorem.words(1),
};

export class WebTablePage extends PageObject {
    readonly userForm = this.get('userForm');
    readonly addNewRecordButton = this.get('addNewRecordButton');
    readonly searchInput = this.get('searchBox');
    readonly firstNameInput = this.get('firstName');
    readonly lastNameInput = this.get('lastName');
    readonly emailInput = this.get('userEmail');
    readonly ageInput = this.get('age');
    readonly salaryInput = this.get('salary');
    readonly departmentInput = this.get('department');
    readonly submitButton = this.get('submit');
    readonly editRecord = this.get('edit-record-4');
    readonly deleteRecord = this.get('delete-record-4');
    readonly tableGrid = this.locator('[class*="rt-tbody"]');
    readonly nextPage = this.locator('[class*="-next"]');
    readonly previousPage = this.locator('[class*="-previous"]');
    readonly totalPages = this.locator('[class*="-totalPages"]');
    readonly selectRows = this.locator('[aria-label*="rows per page"]');
    readonly selectedPage = this.locator('[aria-label*="jump to page"]');


    constructor(page: Page) {
        super(page);
    }

    async goto() {
        if (!Routes.webTablesForm) {
            throw new Error('Routes.webTablesForm is empty or null');
        }
        await this.page.goto(Routes.webTablesForm, { waitUntil: 'domcontentloaded', timeout: 0 });
    }

    async addUser() {
        await this.addNewRecordButton.click();
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.ageInput.fill(String(user.age));
        await this.salaryInput.fill(String(user.salary));
        await this.departmentInput.fill(user.department);
        await this.submitButton.click();
    }

    async fillUser(userObject = user) {
        await this.firstNameInput.fill(userObject.firstName);
        await this.lastNameInput.fill(userObject.lastName);
        await this.emailInput.fill(userObject.email);
        await this.ageInput.fill(String(userObject.age));
        await this.salaryInput.fill(String(userObject.salary));
        await this.departmentInput.fill(userObject.department);
    }

    async deleteUser() {
        await this.editRecord.click();
    }
}