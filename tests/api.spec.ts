//Tests a separate API website http://dummy.restapiexample.com/#  as SwagLabs does not have any API calls
import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api/'

//this should work but unfortunately seems to be rate limited by the website, two calls in a row results in a 429
test.describe("Test API calls on http://dummy.restapiexample.com/#", () => {
    test("Should create new employee record", async ({ request }) => {
        const newRecord = await request.post(`https://dummy.restapiexample.com/api/v1/create`, {
            data: {
                name: "Jon Doe",
                salary: "100000",
                age: "26"
            }
        });
        expect(newRecord.status()).toEqual(200);

        const employees = await request.get(`https://dummy.restapiexample.com/api/v1/employees`);
        expect (employees.ok()).toBeTruthy();
        expect(await employees.json()).toContainEqual(expect.objectContaining({
            name: "Jon Doe",
            salary: "100000",
            age: "26"
        }))
    })
})