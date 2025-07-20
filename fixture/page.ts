import { test as base, Page } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashBoardPage } from '@pages/DashBoardPage';
import { AdminPage } from '@pages/AdminPage';
import { G_CONFIG } from '@config/G_CONFIG';
import fs from 'fs';

const filePath = '.auth/authFile.json';

type baseUI = {
    loginPage: LoginPage;
    dashboardPage: DashBoardPage;
    adminPage: AdminPage;
    authenticatedDashBoardPage: DashBoardPage;
};

export const test = base.extend<baseUI>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashBoardPage(page));
    },
    authenticatedDashBoardPage: async ({ loginPage, dashboardPage }, use) => {
        if (fs.existsSync(filePath)) {
            await dashboardPage.getPage().context().addCookies(JSON.parse(fs.readFileSync(filePath, 'utf-8')).cookies);
            await dashboardPage.goToPageByUrl();
            await use(dashboardPage);
        }
        else{
            await loginPage.goTo();
            await loginPage.inputUserName(G_CONFIG.account.username);
            await loginPage.inputPassword(G_CONFIG.account.password);
            await loginPage.clickLoginButtion();
            await expect(dashboardPage.getNavItemLocator('Dashboard')).toContainClass('active');
            await dashboardPage.storePageState(filePath);
            await use(dashboardPage);
        }
    },
    adminPage: async ({ page }, use) => {
        await use(new AdminPage(page));
    }
});

export const expect = test.expect;