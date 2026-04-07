 
export class AuthorizePage {
    constructor(page) {
        this.page = page;
        // this.credentials = Buffer.from(`${process.env.SEP_USERNAME}:${process.env.SEP_PASSWORD}`).toString('base64');
        console.log("TESTING USERNAME:", process.env.SEP_USERNAME);
        console.log("TESTING PASSWORD:", process.env.SEP_PASSWORD);
    }

    async login() {


        await this.page.goto("https://qa.sep.tdtm.cydeo.com/taws");
    }
}