import { After, Before, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { Browser, chromium, firefox, webkit } from 'playwright';
import { ICustomWorld } from './custom-world';

let browser: Browser;

BeforeAll(async function () {
  switch (process.env.BROWSER) {
    case "firefox":
      browser = await firefox.launch();
      break;
    case "webkit":
      browser = await webkit.launch();
      break;
    default:
      browser = await chromium.launch();
  }
});

Before(async function (this: ICustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: ICustomWorld) {
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  await browser.close();
});
