import { test, expect } from '@playwright/test';
import { AuthRequest } from '../src/app/_services/rest-backend/auth-request.type';
import path from 'path';


const testUser: AuthRequest = {
  UserEmail: "test0@test.it",
  password: "test03",
  name : "Test",
  surname : "Test"
};

test.setTimeout(100_000);

test.beforeEach(async ({ request, page }) => {
	await page.goto('https://localhost:4200/',{ timeout: 100_000 });	

});

test.afterEach(async ({ page, request }) => {
	let response = await request.post('https://127.0.0.1:3000/auth/', {data: testUser});
	const msg = await response.json();
	response = await request.delete('https://127.0.0.1:3000/users/'+ testUser.UserEmail, {headers:{
		Authorization: 'Bearer ' + msg.token
	}});
});


test('Valid Sign up', async ({ page, request }) => {
	
	await expect(page.locator("#userButton")).toBeVisible({ timeout: 100_000 });
	await page.locator("#userButton").click({ timeout: 100_000 });
  	
	await expect(page).toHaveURL("https://localhost:4200/login", { timeout: 100_000 } );

	await expect(page.locator("a#signupLink")).toBeVisible({ timeout: 100_000 });
	await page.locator("a#signupLink").click({ timeout: 100_000 });

	await expect(page).toHaveURL("https://localhost:4200/signup", { timeout: 100_000 } );

	await expect(page.locator("input#email")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#email").fill(testUser.UserEmail, { timeout: 100_000 });

	await expect(page.locator("input#pass")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#pass").fill(testUser.password??"", { timeout: 100_000 });

	await expect(page.locator("input#name")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#name").fill(testUser.surname??"", { timeout: 100_000 });

	await expect(page.locator("input#surname")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#surname").fill(testUser.surname??"", { timeout: 100_000 });

	await expect(page.locator("button[type*=submit]#signupButton")).toBeVisible({ timeout: 100_000 });
	await page.locator("button[type*=submit]#signupButton").click({ timeout: 100_000 });

	await expect(page).toHaveURL("https://localhost:4200/login", { timeout: 100_000 });

	await expect(page.locator("input#email")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#email").fill(testUser.UserEmail, { timeout: 100_000 });

	await expect(page.locator("input#pass")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#pass").fill(testUser.password??"", { timeout: 100_000 });

	await expect(page.locator("button[type*=submit]#loginButton")).toBeVisible({ timeout: 100_000 });
	await page.locator("button[type*=submit]#loginButton").click({ timeout: 100_000 });

	await expect(page).toHaveURL("https://localhost:4200/manage-account", { timeout: 100_000 });

});




