import { Page } from "@playwright/test";
export class DashBoardPage{
    private readonly page : Page;
    
    constructor(page: Page){
        this.page = page
    }

    public getNavItemLocator(name: string){
        return this.page.locator(`//nav[@role="navigation"]//li//span[text()="${name}"]/parent::a`)
    }
}