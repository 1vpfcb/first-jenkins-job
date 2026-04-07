export class PaymentPlanPage {
    constructor(page) {
        this.page = page;
        //locators 

        this.upfrontPaymentPlan = page.locator("//span[contains(@class,'mat-content') and .//span[contains(normalize-space(.),'Upfront')]]",);
        this.upfrontPaymentPlanMode = page.locator("//mat-expansion-panel-header[@id='mat-expansion-panel-header-0']")
        this.FiveInstallments = page.locator("//mat-expansion-panel-header[@id='mat-expansion-panel-header-1']",);       
        this.activeNextBttn = page.locator("//button[contains(@class,'next-button') and text()='Next']",);
        this.activeNextBttn1 = page.locator("//button[@type='submit' and normalize-space()='Next']");
        
        this.paymentForm = page.locator("//mat-expansion-panel-header[@id='mat-expansion-panel-header-1'])",);
    }
      // methods 
    async selectUpfrontPaymentPlan() {
     await this.upfrontPaymentPlan.click();
     await this.activeNextBttn.click();
}
}