export const Routes = {
    registrationForm: '/automation-practice-form',
} as const;

export type RouteKey = keyof typeof Routes;
export type RouteUrl = (typeof Routes)[RouteKey];