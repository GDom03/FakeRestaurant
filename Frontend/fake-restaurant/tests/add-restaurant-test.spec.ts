import { test, expect } from '@playwright/test';
import { AuthRequest } from '../src/app/_services/rest-backend/auth-request.type';
import { RestaurantRequest } from '../src/app/_services/rest-backend/resturant-request.type';
import path from 'path';


const testUser: AuthRequest = {
  UserEmail: "test3@test.it",
  password: "test03",
  name : "Test",
  surname : "Test"
};

const testResturant: RestaurantRequest = {
	name: 'Test Restaurant',
	description: 'Restaurant for the test',
	type: 'Test cousine',
	latitude: 73,
	longitude: 12
};

test.setTimeout(100_000);

test.beforeEach(async ({ request, page }) => {
	await page.goto('https://localhost:4200/', { timeout: 100_000 });
	
	const response = await request.post('https://127.0.0.1:3000/signup', {data: testUser});
	
	await expect(page.locator("#userButton")).toBeVisible({ timeout: 100_000 });
	await page.locator("#userButton").click({ timeout: 100_000 });
	
	await expect(page.locator("input#email")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#email").fill(testUser.UserEmail, { timeout: 100_000 });
	
	await expect(page.locator("input#pass")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#pass").fill(testUser.password??"", { timeout: 100_000 });
	
	await expect(page.locator("button[type*=submit]#loginButton")).toBeVisible({ timeout: 100_000 });
	await page.locator("button[type*=submit]#loginButton").click({ timeout: 100_000 });
	
});

test.afterEach(async ({ page, request }) => {
	let response = await request.post('https://127.0.0.1:3000/auth/', {data: testUser});
	const msg = await response.json();
	response = await request.delete('https://127.0.0.1:3000/users/'+ testUser.UserEmail, {headers:{
		Authorization: 'Bearer ' + msg.token
	}});
});

test('Add Restaurant', async ({ page, request }) => {
	
	await expect(page.locator("a#addRestaurantLink")).toBeVisible({ timeout: 100_000 });
	await page.locator("a#addRestaurantLink").click({ timeout: 100_000 });

	await expect(page.locator("input#name")).toBeVisible({ timeout: 100_000 });
  	await page.locator("input#name").fill(testResturant.name, { timeout: 100_000 });

	await expect(page.locator("input#description")).toBeVisible({ timeout: 100_000 });
  	await page.locator("input#description").fill(testResturant.description, { timeout: 100_000 });

	await expect(page.locator("input#type")).toBeVisible({ timeout: 100_000 });
  	await page.locator("input#type").fill(testResturant.type, { timeout: 100_000 });

	await expect(page.locator("input#latitude")).toBeVisible({ timeout: 100_000 });
  	await page.locator("input#latitude").fill(testResturant.latitude.toString(), { timeout: 100_000 });

	await expect(page.locator("input#longitude")).toBeVisible({ timeout: 100_000 });
  	await page.locator("input#longitude").fill(testResturant.longitude.toString(), { timeout: 100_000 });

	await expect(page.locator("#fileUpload")).toBeVisible({ timeout: 100_000 });
	const filePath = await path.resolve('tests/test-files/img.jpeg' );
  	await page.setInputFiles('#fileUpload', filePath, { timeout: 100_000 });

	await expect(page.locator('button#addRestaurantButton')).toBeVisible({ timeout: 100_000 });
	await page.locator("button#addRestaurantButton").click({ timeout: 100_000 });

	await expect(page).toHaveURL("https://localhost:4200/user-restaurants", { timeout: 100_000 });
	await expect(page.locator("app-deletable-restaurant-item")).toHaveCount(1, { timeout: 100_000 });
});