import { Locator, Page } from '@playwright/test';

export async function uploadFile(
    fileName: string,
    uploadButton: Locator,
    page: Page,
) {
    const fileChooserPromise = page.waitForEvent('filechooser');
    await uploadButton.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(`src/files/${fileName}`);
}