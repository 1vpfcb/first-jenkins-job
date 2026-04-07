export class BasePage {
    constructor(page) {
        this.page = page;
        this.step1StepperCircle = page.locator("//div[@class='step-circle'][span='1']");
        this.step2StepperCircle = page.locator("//div[@class='step-circle'][span='2']",);
        this.step3StepperCircle = page.locator("//div[@class='step-circle'][span='3']",);

        this.backBttn = page.locator('span.back-button:visible');
    }

    async goBack() {
        // Because the locator itself mandates visibility, we can just click it!
        await this.backBttn.click();

        // Give the Angular app a moment to swap the screens back
        await this.page.waitForLoadState('networkidle');
    }
}