import { test, expect } from '@fixture/page';
import { ENVTag, ScopeTag, TenantTag } from 'enums/Tags';


test(`Search with valid userName only ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.SMOKE} ${ScopeTag.REGRESSION}`, async ({ authenticatedDashBoardPage, adminPage}) => {
  const userName = 'Admin';

  await authenticatedDashBoardPage.goToPage('Admin');
  
  await adminPage.inputUserName(userName);
  await adminPage.clickSearchButton();

  await adminPage.waitTillTableLoaded();

  const result = await adminPage.getRecordResult();
  expect(result.every(r => r["Username"].includes(userName))).toBeTruthy();
});

test(`Search with userRole only ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.SMOKE} ${ScopeTag.REGRESSION}`, async ({ authenticatedDashBoardPage, adminPage}) => {
  const userRole = 'Admin';

  await authenticatedDashBoardPage.goToPage('Admin');

  await adminPage.selectOptionFromDropdown('User Role', userRole);
  await adminPage.clickSearchButton();

  await adminPage.waitTillTableLoaded();

  const result = await adminPage.getRecordResult();
  expect(result.every(r => r["User Role"] === userRole)).toBeTruthy();
});


test(`Search with employeeName only ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.SMOKE} ${ScopeTag.REGRESSION}`, async ({ authenticatedDashBoardPage, adminPage}) => {
  const employeeSearch = 'Mohan';
  const employeeName = 'Mohan Tejas Patil';

  await authenticatedDashBoardPage.goToPage('Admin');

  await adminPage.inputEmployeeName(employeeSearch, employeeName);
  await adminPage.clickSearchButton();

  await adminPage.waitTillTableLoaded();

  const result = await adminPage.getRecordResult();
  expect(result.every(r => r["Employee Name"].includes(employeeSearch))).toBeTruthy();
});


test(`Search with Status only ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.SMOKE} ${ScopeTag.REGRESSION}`, async ({ authenticatedDashBoardPage, adminPage}) => {
  const status = 'Enabled';
  await authenticatedDashBoardPage.goToPage('Admin');

  await adminPage.selectOptionFromDropdown('Status', status);
  await adminPage.clickSearchButton();

  await adminPage.waitTillTableLoaded();

  const result = await adminPage.getRecordResult();
  expect(result.every(r => r["Status"] === status)).toBeTruthy();
});


test(`Search with all fields ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.SMOKE} ${ScopeTag.REGRESSION}`, async ({ authenticatedDashBoardPage, adminPage}) => {
  const userName = 'Admin';
  const userRole = 'Admin';
  const status = 'Enabled';

  await authenticatedDashBoardPage.goToPage('Admin');

  await adminPage.inputUserName(userName);
  await adminPage.selectOptionFromDropdown('User Role', userRole);
  await adminPage.selectOptionFromDropdown('Status', status);
  
  await adminPage.clickSearchButton();

  await adminPage.waitTillTableLoaded();

  const result = await adminPage.getRecordResult();
  expect(result.every(r => r["Username"].includes(userName) &&
                          r["User Role"] === userRole &&
                          r["Status"] === status)).toBeTruthy();
});

