import { G_CONFIG } from "@config/G_CONFIG";
import { expect, Page } from "@playwright/test";
import { get } from "http";
export class DashBoardPage{
    getPage() {
        return this.page;
    }
    async goToPageByUrl() {
        await this.page.goto(`${G_CONFIG.baseUrl}/web/index.php/dashboard/index`);
    }
    private page : Page;
    
    constructor(page: Page){
        this.page = page
    }

    public getNavItemLocator(name: string){
        return this.page.locator(`//nav[@role="navigation"]//li//span[text()="${name}"]/parent::a`)
    }

    async goToPage(name: string){
        await this.getNavItemLocator(name).click();
        expect(this.getNavItemLocator(name)).toContainClass('active');
    }

    async storePageState(filePath: string){
        await this.page.context().storageState({ path: filePath });
    }
}