import { metaTest } from '../fixture/meta.fixture';

export type Api = {
};

export type ApiFixture = {
    api: Api;
};

export const API: Api = {
};

export const apiTest = metaTest.extend<ApiFixture>({
    // eslint-disable-next-line no-empty-pattern
    api: async ({}, use) => {
        await use(API);
    },
});