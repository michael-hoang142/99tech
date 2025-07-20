import { test, expect } from '@fixture/page';
import { G_CONFIG } from '@config/G_CONFIG';
import { ENVTag, ScopeTag, TenantTag } from 'enums/Tags';


const data = ["someRandomUsername", "124abc@amgak,cim", "24859123"]

data.forEach((userName) => {
  test.only(`Search with invalid userName = "${userName}" ${TenantTag.ORANGE} ${ENVTag.DEMO} ${ScopeTag.SMOKE} ${ScopeTag.REGRESSION}`, async ({ authenticatedDashBoardPage, adminPage}) => {
    await authenticatedDashBoardPage.goToPage('Admin');
    
    await adminPage.inputUserName(userName);
    await adminPage.clickSearchButton();

    await expect(adminPage.getNotificationMessageLocator()).toBeVisible();
    await expect(adminPage.getNotificationMessageLocator()).toHaveText('No Records Found');

    await adminPage.waitTillTableLoaded();

    const result = await adminPage.getRecordResult();
    expect(result.length).toBe(0);
  });
});
