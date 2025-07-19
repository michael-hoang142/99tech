import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashBoardPage } from '@pages/DashBoardPage';

type baseUI = {
	loginPage: LoginPage;
	dashboardPage: DashBoardPage;
};

export const test = base.extend<baseUI>({
	loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashBoardPage(page));
    }
});

export const expect = test.expect;