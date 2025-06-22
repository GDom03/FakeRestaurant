import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://localhost:4200/');
});

const VALID_EMAIL = "domgag@gmail.com" as const;
const VALID_PASSWORD = "domgag" as const;

test('Valid Login', async ({ page }) => {
  await page.locator("#userButton").click();
  await page.locator("input#email").click();
  await page.locator("input#email").fill(VALID_EMAIL);
  await page.locator("input#pass").click();
  await page.locator("input#pass").fill(VALID_PASSWORD);
  await page.locator("button[type*=submit]#signup").click();
  await expect(page).toHaveURL("https://localhost:4200/manage-account");

});

test('Invalid Login', async ({ page }) => {
  await page.locator("#userButton").click();
  await page.locator("input#email").click();
  await page.locator("input#email").fill(VALID_EMAIL + " --");
  await page.locator("input#pass").click();
  await page.locator("input#pass").fill('domgag');
  await page.locator("button[type*=submit]#signup").click();
  await expect(page).toHaveURL("https://localhost:4200/login");

});

