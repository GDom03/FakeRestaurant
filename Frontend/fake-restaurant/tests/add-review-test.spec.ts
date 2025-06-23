import { test, expect } from '@playwright/test';
import { AuthRequest } from '../src/app/_services/rest-backend/auth-request.type';
import { RestaurantRequest } from '../src/app/_services/rest-backend/resturant-request.type';
import { ReviewRequest } from '../src/app/_services/rest-backend/review-request.type';

const testUser: AuthRequest = {
  	UserEmail: "test6@test.it",
  	password: "test03",
  	name: "Test",
  	surname: "Test"
};

const testRestaurant: RestaurantRequest = {
  	name: 'Test Add Review',
  	description: 'Restaurant for the test',
  	type: 'Test cousine',
  	latitude: 73,
  	longitude: 12
};

const testreview: ReviewRequest = {
	restaurantId: 0,
	title: 'Test Add Review',
	content: 'Test Add Review for the test',
	overallRating: 3.5,
	serviceRating: 5,
	qualityPriceRating: 4,
	foodRating: 3,
	atmosphereRating: 2
};

test.setTimeout(100_000);

test.beforeEach(async ({ request, page }) => {
  	await page.goto('https://localhost:4200/', { timeout: 100_000 });

  	await request.post('https://127.0.0.1:3000/signup', { data: testUser });

	let response = await request.post('https://127.0.0.1:3000/auth/', {data: testUser});
	const msg = await response.json();

	response = await request.post('https://127.0.0.1:3000/restaurants', { 
		headers: {
			Authorization: 'Bearer ' + msg.token
		},
		data: testRestaurant 
	});


  	await expect(page.locator("#userButton")).toBeVisible({ timeout: 100_000 });
  	await page.locator("#userButton").click({ timeout: 100_000 });

  	await expect(page.locator("input#email")).toBeVisible({ timeout: 100_000 });
  	await page.locator("input#email").fill(testUser.UserEmail, { timeout: 100_000 });

  	await expect(page.locator("input#pass")).toBeVisible({ timeout: 100_000 });
  	await page.locator("input#pass").fill(testUser.password ?? "", { timeout: 100_000 });

  	await expect(page.locator("button[type*=submit]#loginButton")).toBeVisible({ timeout: 100_000 });
  	await page.locator("button[type*=submit]#loginButton").click({ timeout: 100_000 });

  	await expect(page).toHaveURL("https://localhost:4200/manage-account", { timeout: 100_000 });
	
	
});

test.afterEach(async ({ page, request }) => {
	let response = await request.post('https://127.0.0.1:3000/auth/', {data: testUser});
	const msg = await response.json();
	response = await request.delete('https://127.0.0.1:3000/users/'+ testUser.UserEmail, {headers:{
		Authorization: 'Bearer ' + msg.token
	}});

});

test('Add Review', async ({ request, page }) => {
	await page.goto('https://localhost:4200/home',{ timeout: 100_000 });
	await expect(page.locator("#searchField")).toBeVisible({ timeout: 100_000 });
	await page.locator("#searchField").fill(testRestaurant.name, { timeout: 100_000 });
	await expect(page.locator("#searchButton")).toBeVisible({ timeout: 100_000 });
	await page.locator("#searchButton").click({ timeout: 100_000 });
	await expect(page).toHaveURL("https://localhost:4200/search-results", { timeout: 100_000 });
	await expect(page.locator("app-restaurant-item")).toHaveCount(1,{timeout: 100_000});
	await page.locator("app-restaurant-item").first().locator("h1").click({timeout: 100_000})
	await expect(page).toHaveURL("https://localhost:4200/restaurants/"+testRestaurant.name, { timeout: 100_000 });
	await expect(page.locator("#addReviewButton")).toBeVisible({ timeout: 100_000 });
	await page.locator("#addReviewButton").click({ timeout: 100_000 });

	await expect(page.locator("input#title")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#title").fill(testreview.title, { timeout: 100_000 });

	await expect(page.locator("input#content")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#content").fill(testreview.content, { timeout: 100_000 });

	await expect(page.locator("input#serviceRating")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#serviceRating").fill(testreview.serviceRating.toString(), { timeout: 100_000 });

	await expect(page.locator("input#qualityPriceRating")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#qualityPriceRating").fill(testreview.qualityPriceRating.toString(), { timeout: 100_000 });

	await expect(page.locator("input#foodRating")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#foodRating").fill(testreview.foodRating.toString(), { timeout: 100_000 });
	
	await expect(page.locator("input#atmosphereRating")).toBeVisible({ timeout: 100_000 });
	await page.locator("input#atmosphereRating").fill(testreview.atmosphereRating.toString(), { timeout: 100_000 });

	await expect(page.locator('button#addReviewButton')).toBeVisible({ timeout: 100_000 });
	await page.locator("button#addReviewButton").click({ timeout: 100_000 });

	await expect(page).toHaveURL("https://localhost:4200/user-reviews", { timeout: 100_000 });


});
