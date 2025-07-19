import { G_CONFIG } from "@config/G_CONFIG";
import { Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page;

    constructor(page: Page){
        this.page = page
    }

    getErrorMessageFromInputLocator(inputField: string){
        return this.page.locator(`//input[@placeHolder="${inputField}"]/ancestor::div[@class="oxd-form-row"]//span[contains(@class,'oxd-text--span oxd-input-field-error-message')]`)
    }

    getAlertMessageLocator(){
        return this.page.locator('//div[@role="alert"]')
    }

    async inputUserName(userName: string){
        await this.page.locator("//input[@name='username']").fill(userName);
    }

    async inputPassword(password: string){
        await this.page.locator("//input[@name='password']").fill(password);
    }

    async clickLoginButtion(){
        await this.page.locator('//button[text()=" Login "]').click();
    }

    async goTo() {
        await this.page.goto(G_CONFIG.baseUrl);
        await this.page.waitForLoadState('networkidle');
    }
}