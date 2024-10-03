import { Locator, Page } from '@playwright/test';

export class PageObject {

    constructor(public page: Page) {
    }

    get(testId: string | RegExp, parent?: Locator): Locator {
        return parent ? parent.getByTestId(testId) : this.page.getByTestId(testId);
    }

    locator(
        selector: string,
        options?: {
            has?: Locator;
            hasNot?: Locator;
            hasNotText?: string | RegExp;
            hasText?: string | RegExp;
        },
        parent?: Locator,
    ): Locator {
        return parent
            ? parent.locator(selector, options)
            : this.page.locator(selector, options);
    }

    input(testId: string | RegExp, parent?: Locator): Locator {
        return this.get(testId, parent).locator('input');
    }

    textarea(testId: string | RegExp, parent?: Locator): Locator {
        return this.get(testId, parent).locator('textarea');
    }
}
