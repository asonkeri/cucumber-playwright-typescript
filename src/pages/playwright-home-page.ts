import { PageBase } from "./base";
import { ICustomWorld } from "../support/custom-world";
import { expect } from '@playwright/test';

export class PlaywrightHomePage extends PageBase {
  url = "https://playwright.dev";
  themeToggle = 'nav >> div[role="button"]';
  constructor(world: ICustomWorld) {
    super(world);
  }

  async getTheme() {
    return this.world.page?.getAttribute("html", "data-theme");
  }

  async toggleTheme() {
    await this.world.page?.click(this.themeToggle);
  }

  async shouldHaveTheme(theme: string) {
    const locator = this.world.page!.locator("html")
    await expect(locator).toHaveAttribute("data-theme", theme)
  }
}
