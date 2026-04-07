export class PersonalInfoPage{
    constructor(page) {
        this.page = page;
        // locators

        this.firstNameInput =page.locator("//input[@formcontrolname='firstName']");
        this.lastNameInput = page.getByLabel("Last Name");
        this.emailInput = page.locator("//input[@formcontrolname='email']");
        this.phoneNumberInput = page.locator("//input[@formcontrolname='phoneNumber']",);
        this.howDidYouHearDropDown = page.locator("//mat-label[text()='How did you hear about us?']",);
    };

    // creating methods to interact with those locators
    async fillPersonalInfo(
        firstName,
        lastName,
        email,
        phoneNumber,
        howDidYouHear) {
            await this.firstNameInput.fill(firstName);
            await this.lastNameInput.fill(lastName);
            await this.emailInput.fill(email);
            await this.phoneNumberInput.fill(phoneNumber);
            await this.howDidYouHearDropDown.click(howDidYouHear);
            await this.page.locator(`//span[@class='mdc-list-item__primary-text' and text()='${howDidYouHear}']`).click();
}
        
        }
