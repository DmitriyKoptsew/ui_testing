import { test as base } from '@playwright/test';


export type MetaFixture = {
    meta: Map<string, any>;
};

export const metaTest = base.extend<MetaFixture>({
    // eslint-disable-next-line no-empty-pattern
    meta: async ({}, use) => {
        await use(new Map<string, any>());
    },
});