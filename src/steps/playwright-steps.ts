import { Given, Then, When } from "@cucumber/cucumber";
import { PlaywrightHomePage } from "../pages/playwright-home-page";
import { ICustomWorld } from "../support/custom-world";

type Theme = "light" | "dark";
let homePage: PlaywrightHomePage;

Given("Playwright Homepage Is Opened", async function (this: ICustomWorld) {
  homePage = new PlaywrightHomePage(this);
});

Given("Theme Is Set To {string} mode", async function (theme: Theme) {
  await homePage.open();
  await homePage.setLocalStorage("theme", theme);
});

When("Change theme to {string} mode", async function (theme: Theme) {
  const currentTheme = await homePage.getTheme();
  if (currentTheme != theme) {
    await homePage.toggleTheme();
  }
});

Then("We See {string} mode", async function (this: ICustomWorld, theme: Theme) {
  await homePage.shouldHaveTheme(theme);
});
