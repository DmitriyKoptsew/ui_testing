import { expect, Locator } from '@playwright/test';

import { cssStyles, errorColor } from './colors';

export async function checkColor(
    locator: Locator,
    cssStyle = cssStyles.borderColor,
    color = errorColor,
) {
    await expect(locator).toHaveCSS(cssStyle, color);
}
