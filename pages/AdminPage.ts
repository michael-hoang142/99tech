import { expect, Page } from "@playwright/test";

export class AdminPage{
 
    private readonly page : Page;
    
    constructor(page: Page){
        this.page = page
    }

    public getNavItemLocator(name: string){
        return this.page.locator(`//nav[@role="navigation"]//li//span[text()="${name}"]/parent::a`)
    }

    public getInputFieldLocator(label: string) {
        return this.page.locator(`//label[text()="${label}"]/ancestor::div[contains(@class, "oxd-grid-item")]//input`);
    }

    public getDropDownLocator(label: string) {
        return this.page.locator(`//label[text()="${label}"]/ancestor::div[contains(@class, "oxd-grid-item")]`);
    }

    public getOptionFromDropdownLocator(label: string, value: string) {
        return this.page.locator(`//label[text()="${label}"]/ancestor::div[contains(@class, "oxd-grid-item")]//div[@role="listbox"]//span[text()="${value}"]`);
    }

    public getTableLoaderLocator(){
        return this.page.locator('//div[@class= "oxd-table-loader"]');
    }

    public getNotificationMessageLocator() {
        return this.page.locator('//div[@aria-live="assertive"]//p').last();
    }

    async goToPage(name: string){
        await this.getNavItemLocator(name).click();
        expect(this.getNavItemLocator(name)).toContainClass('active');
    }

    async clickSearchButton() {
        await this.page.locator('//button[@type="submit" and text()=" Search "]').click();
    }

    async clickOnResetButton() {
        await this.page.locator('//button[@type="reset" and text()=" Reset "]').click();
    }

    async inputUserName( data: string) {
      await this.getInputFieldLocator("Username").fill(data);
    }

    async inputEmployeeName(search: string, selection: string) {
      await this.getInputFieldLocator("Employee Name").fill(search);
      await this.getOptionFromDropdownLocator('Employee Name', selection).click();
    }

    async selectOptionFromDropdown(label: string, value: string) {
        await this.getDropDownLocator(label).click();
        await this.getOptionFromDropdownLocator(label, value).click();
    }

    async waitTillTableLoaded() {
        await expect(this.getTableLoaderLocator()).not.toBeAttached();
    }

    async getRecordResult(){
        await this.page.waitForTimeout(1000); // Wait for the FE delay to load the table
        const headers = await this.page.locator('//div[@role="rowgroup" and @class="oxd-table-header"]').allInnerTexts();
        const contents = await this.page.locator('//div[@class="oxd-table-card"]').allInnerTexts();
        const keys = headers.map(h => h.split('\n'))[0];
        const rows = contents.map(c => c.split('\n'));
        const result = rows.map(row => {
            let record: { [key: string]: string } = {};
            row.forEach((value, i) => {
                record[keys[i]] = value;
            });
            return record;
        });
        return result;
    }
}