import {test}from '@playwright/test';
import { LoginPage } from '../page_objects/login.po.js';
const testData = require('../fixtures/loginFixtures.json');

test.beforeEach(async ({page})=>{
    await page.goto('/');
})

test.describe('Login tests', () => {
    test('Login using valid username and password', async ({page}) => {
        const login = new LoginPage(page);
        await login.login(testData["valid user"].userName, testData["valid user"].password);
        await login.verifyValidLogin();
    });

    test('Login using invalid username and password', async ({page}) => {
        const login = new LoginPage(page);
        await login.login(testData["invalid user"].userName, testData["invalid user"].password);
        await login.verifyInvalidLogin();
    });
});
