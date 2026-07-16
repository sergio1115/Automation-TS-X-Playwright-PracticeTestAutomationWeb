import { Page } from '@playwright/test';

export async function waitForNavigation(page: Page, url: string | RegExp) {
  await page.waitForURL(url);
}

export function generateRandomString(length: number): string {
  return Math.random().toString(36).substring(2, 2 + length);
}