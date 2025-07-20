import { test, expect } from '@fixture/page';
import { G_CONFIG } from '@config/G_CONFIG';
import { ENVTag, ScopeTag, TenantTag } from 'enums/Tags';


test(`Login succeed with valid credential ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.SMOKE} ${ScopeTag.REGRESSION}`, async ({ loginPage, dashboardPage}) => {

  await loginPage.goTo();
  await loginPage.inputUserName(G_CONFIG.account.username);
  await loginPage.inputPassword(G_CONFIG.account.password);
  await loginPage.clickLoginButtion();

  await expect(dashboardPage.getNavItemLocator('Dashboard')).toContainClass('active');
});

test(`Login failed without input credential  ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.REGRESSION}` , async ({ loginPage }) => {

  await loginPage.goTo();
  await loginPage.clickLoginButtion();
  
  await expect(loginPage.getErrorMessageFromInputLocator("Username")).toBeVisible();
  await expect(loginPage.getErrorMessageFromInputLocator("Username")).toHaveText('Required');

  await expect(loginPage.getErrorMessageFromInputLocator("Password")).toBeVisible();
  await expect(loginPage.getErrorMessageFromInputLocator("Password")).toHaveText('Required');
});

test(`Login failed without input password credential  ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.REGRESSION}` , async ({ loginPage }) => {

  await loginPage.goTo();

  await loginPage.inputUserName(G_CONFIG.account.username);
  await loginPage.clickLoginButtion();
  
  await expect(loginPage.getErrorMessageFromInputLocator("Username")).not.toBeVisible();

  await expect(loginPage.getErrorMessageFromInputLocator("Password")).toBeVisible();
  await expect(loginPage.getErrorMessageFromInputLocator("Password")).toHaveText('Required');
});


test(`Login failed without input userName credential  ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.REGRESSION}` , async ({ loginPage }) => {

  await loginPage.goTo();

  await loginPage.inputPassword(G_CONFIG.account.password);
  await loginPage.clickLoginButtion();
  
    await expect(loginPage.getErrorMessageFromInputLocator("Username")).toBeVisible();
  await expect(loginPage.getErrorMessageFromInputLocator("Username")).toHaveText('Required');

  await expect(loginPage.getErrorMessageFromInputLocator("Password")).not.toBeVisible();
});

test(`Login failed with invalid credential ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.REGRESSION}`, async ({ loginPage }) => {

  await loginPage.goTo();
  await expect(loginPage.getAlertMessageLocator()).not.toBeVisible();

  await loginPage.inputUserName('HelloWorld');
  await loginPage.inputPassword('12345678');
  await loginPage.clickLoginButtion();

  await expect(loginPage.getAlertMessageLocator()).toBeVisible();
  await expect(loginPage.getAlertMessageLocator()).toHaveText('Invalid credentials');
});

