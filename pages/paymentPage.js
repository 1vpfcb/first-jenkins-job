export class PaymentPage {
    constructor(page){
        this.page = page;

        // locators
        this.paymentFrame = page.frameLocator("(//iframe[starts-with(@name, '__privateStripeFrame')])[1]");
        this.cardNumberInput = this.paymentFrame.getByPlaceholder("1234 1234 1234 1234");
        this.expiryDateInput = this.paymentFrame.getByPlaceholder("MM / YY");
        this.cvcInput = this.paymentFrame.getByPlaceholder("CVC");
        this.zipCodeInput = this.paymentFrame.getByPlaceholder("12345");

        this.totalPrice = page.locator("//div[@class='panel-content-payment']")
        
       
    }

    // methods 

    async fillPaymentForm(
    cardNumber, 
    expiryDate,
    cvc,
    zipCode,
    ) {
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryDateInput.fill(expiryDate);
        await this.cvcInput.fill(cvc);
        await this.zipCodeInput.fill(zipCode);
    }


} 