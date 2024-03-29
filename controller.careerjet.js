import dotenv from "dotenv";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

dotenv.config();
puppeteer.use(StealthPlugin())
const details = {
    email: "pathak2002ujjwal@gmail.com",
    password: "abc2002",
    phone_number: "8140690999",
    position: "ui-developer",
    location: "bangalore"
};

const setupBrowser = async () => {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        args: ["--disable-setuid-sandbox", "--no-sandbox", "--single-process", "--no-zygote"], headless: true, executablePath: process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });
    console.log("Creating new process");
    const page = await browser.newPage();
    return { browser, page };
}

const startApply = async () => {
    const { browser, page } = await setupBrowser();

    try {
        await page.goto("https://www.careerjet.co.in/login");
        console.log("CareerJet login in page opened");
        console.log(await page.content());

        await page.type('#email', details.email);
        console.log(`${details.email} entered`);
        await page.type('#password', details.password);
        console.log(`${details.password} entered`);
        await page.click('button[type="submit"]');
        console.log(`button clicked`);

        await page.goto("https://www.careerjet.co.in/" + details.position + "-jobs/" + details.location + "-84042.html?ay=1");
        console.log("CareerJet Jobs page opened");
        console.log(await page.content());

        await page.waitForSelector('iframe[title="reCAPTCHA"]');
        const frameHandle = await page.$('iframe[title="reCAPTCHA"]');
        const frame = await frameHandle.contentFrame();
        await frame.click('.recaptcha-checkbox');
        await page.waitForTimeout(5000);
        console.log("Captcha solved");

        console.log(await page.content());

        // const jobURLs = await page.$$eval('article.job.clicky', articles => {
        //     return articles.map(article => article.getAttribute('data-url'));
        // });

        // for (const jobURL of jobURLs) {
        //     try {

        //         console.log(jobURL);
        //         await page.goto(`https://www.careerjet.co.in/${jobURL}`);
        //         const ApplyButtonSelector = `button[data-buttonlabel="Apply Now"]`;
        //         if (ApplyButtonSelector) {
        //             await page.click(ApplyButtonSelector); // Use page instead of page
        //             await page.waitForTimeout(2000);
        //             await page.evaluate(() => {
        //                 const divToScroll = document.querySelector('#modal');
        //                 divToScroll.scrollTop = divToScroll.scrollHeight;
        //             });
        //             await page.waitForTimeout(2000);
        //             const iframeSelector = '#apply'; // Replace with the actual iframe selector
        //             const iframeElementHandle = await page.$(iframeSelector);
        //             const iframeContent = await iframeElementHandle.contentFrame();
        //             const ContinueButtonSelector = 'div.actions.sticky.moved > .container > .row > .col.col-xs-12 > button';
        //             await iframeContent.click(ContinueButtonSelector);
        //             await page.waitForTimeout(1000);
        //             const ContinueButtonSelector2 = 'div.actions.sticky > div > div > div.col.col-xs-8 > button';
        //             let continueButton2 = await iframeContent.$(ContinueButtonSelector2);
        //             while (continueButton2) {
        //                 await continueButton2.click();
        //                 await page.waitForTimeout(1000); // Adjust the timeout as needed
        //                 continueButton2 = await iframeContent.$(ContinueButtonSelector2);
        //             }

        //             await page.waitForTimeout(2000);
        //         }
        //     } catch (error) {
        //         console.error(`Error during ${jobURL}. Going to next job.`);
        //     }
        // }
    } catch (error) {
        console.error('Error during application:', error);
        return { success: false, error };
    } finally {
        await page.close();
        await browser.close();
        return { success: true };
    }
}

export default startApply;