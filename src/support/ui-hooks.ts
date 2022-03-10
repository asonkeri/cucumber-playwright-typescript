import { After, AfterAll, Before } from "@cucumber/cucumber";
import { Browser, chromium, firefox, webkit } from "playwright";
import { ICustomWorld } from "./custom-world";

let browser: Browser;

Before({ tags: "@ui" }, async function (this: ICustomWorld) {
  browser = await initBrowser();
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After({ tags: "@ui" }, async function (this: ICustomWorld) {
  await this.page?.close();
  await this.context?.close();
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});

/**
 * Reuse browser instance across features and only initialize it on first call.
 */
async function initBrowser() {
  if (browser == undefined) {
    switch (process.env.BROWSER) {
      case "firefox":
        return firefox.launch();
      case "webkit":
        return webkit.launch();
      default:
        return chromium.launch({ headless: false });
    }
  }
  return browser;
}
