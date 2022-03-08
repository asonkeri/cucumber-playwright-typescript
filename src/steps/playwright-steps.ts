import { ICustomWorld } from "../support/custom-world";
import { Given, When, Then } from "@cucumber/cucumber";

type Theme = "light" | "dark";

Given("Theme Is Set To {string} mode", async function (theme: Theme) {
  const { page } = this as ICustomWorld;
  await page?.goto("https://playwright.dev");
  await page?.evaluate(`window.localStorage.setItem('theme','${theme}')`);
  await page?.reload();
});

When("Change theme to {string} mode", async function (theme: Theme) {
  const { page } = this as ICustomWorld;
  const currentTheme = await page?.getAttribute("html", "data-theme");
  if (currentTheme != theme) {
    await page?.click('nav >> div[role="button"]');
  }
});

Then("We See {string} mode", async function (theme: Theme) {
  const { page } = this as ICustomWorld;
  await page?.waitForSelector(`xpath=html[@data-theme='${theme}']`);
});
