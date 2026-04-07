import { test, expect } from '@playwright/test'
import { PaymentPage } from '../pages/paymentPage.js';
import { PersonalInfoPage } from '../pages/personalInfoPage.js'
import { PaymentPlanPage } from '../pages/paymentPlanPage.js'
import { AuthorizePage } from '../pages/authorize.js'
import { base, faker } from "@faker-js/faker";
import { BasePage } from '../pages/basePage.js'

test.describe('Payment plans', () => {
    test.beforeEach(async ({ page }) => {
        const login = new AuthorizePage(page);
        await login.login();

        const personalInfo = new PersonalInfoPage(page);
        await personalInfo.fillPersonalInfo(
            faker.person.firstName(),
            faker.person.lastName(),
            faker.internet.email(),
            faker.string.numeric(10),
            'Instagram'
        )

        const paymentPlan = new PaymentPlanPage(page);
        await paymentPlan.activeNextBttn1.click();


        // });
        // test.afterEach(async ({ page }) => {
        //     await page.close();
    });

    test('Click Next button on payment plans page @sep16', async ({ page }) => {
        // creating an instance of the PaymentPlanPage class to access its methods and locators
        const paymentPlan = new PaymentPlanPage(page);


        await paymentPlan.upfrontPaymentPlan.click();
        await expect(paymentPlan.activeNextBttn).toBeEnabled();
        await paymentPlan.activeNextBttn.click();
        // await page.waitForLoadState('networkidle'); // waiting for the page to load completely after the popup is triggered

        const basePage = new BasePage(page);
        const paymentPage = new PaymentPage(page);

        // if (await paymentPage.cardNumberInput.isVisible()) {
        //     console.log('Payment page is successfully loaded after clicking the Next button on the payment plans page.');
        // }
        await expect(paymentPage.cardNumberInput).toBeVisible({ timeout: 15000 });
        console.log('Payment page successfully loaded.');
        await basePage.goBack();

        await paymentPlan.FiveInstallments.click();
        await expect(paymentPlan.activeNextBttn).toBeEnabled();
        await paymentPlan.activeNextBttn.click();
        // await page.waitForLoadState('networkidle');
        // waiting for the page to load completely after the popup is triggered
        await expect(basePage.step3StepperCircle).toHaveCSS('background-color', 'rgb(1, 201, 255)');
        await expect(basePage.step2StepperCircle).toHaveCSS('background-color', 'rgb(172, 245, 138)');
        console.log('In the stepper, step 3 circle is blue, and step 2 circle is green after clicking the Next button on the payment plans page.');

        await expect(paymentPage.cardNumberInput).toBeVisible();
        console.log('Payment page is successfully loaded after clicking the Next button on the payment plans page.');

        await expect(basePage.backBttn).toBeVisible();
        console.log('Back button is visible on the payment page after clicking the Next button on the payment plans page.');
    });

    test('Verify payment plan selection and Next button activation @sep14', async ({ page }) => {

        //When usr is navigated to payment plan page for the first,
        //  by default no payment is selcted and the next button is disabled
        const paymentPlan = new PaymentPlanPage(page);
        // checking the next button is disabled
        await expect(paymentPlan.activeNextBttn).toBeDisabled();

        //When the user selects any payment plan (Accordion)
        // that option should be highlighted to indicate selection.

        await paymentPlan.upfrontPaymentPlan.click();
        // Checks if the class list includes the word 'active'
        await expect(paymentPlan.upfrontPaymentPlanMode).toHaveAttribute('aria-expanded', 'true');
        console.log('The upfront payment plan is highlighted after selection.');

        // checked if the next button is enabled after selecting a payment plan
        let plans = [paymentPlan.upfrontPaymentPlan, paymentPlan.FiveInstallments];
        for (let plan of plans) {
            await plan.click();
            await expect(paymentPlan.activeNextBttn).toBeEnabled();
            console.log(` after pressing on ${plan} the Next button is enabled`)
        };

        await expect(paymentPlan.activeNextBttn).toBeEnabled();
        await paymentPlan.activeNextBttn.click();


        // gotta create a new object to access element of paymentPage
        const paymentPage = new PaymentPage(page);
        const basePage = new BasePage(page);

        await expect(basePage.backBttn).toBeVisible({ timeout: 5000 });
        await expect(paymentPage.totalPrice).toBeVisible();

        console.log('After clicking the Next button, the total price and back button are visible on the payment page.');

    });

});