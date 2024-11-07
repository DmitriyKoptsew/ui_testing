export const Routes = {
    registrationForm: '/automation-practice-form',
    webTablesForm: '/webtables',
    bookStoreLogin: '/login',
    bookStoreRegister: '/register',
    bookStoreBooks: '/books',
    bookStoreProfile: '/profile',
} as const;

export type RouteKey = keyof typeof Routes;
export type RouteUrl = (typeof Routes)[RouteKey];