import { ICustomWorld } from "../support/custom-world";

export class PageBase {
  url: string;
  world: ICustomWorld;
  constructor(world: ICustomWorld) {
    this.world = world;
    this.url = "";
  }

  async open() {
    await this.world.page?.goto(this.url);
  }

  async setLocalStorage(key: string, value: string) {
    await this.world.page?.evaluate(
      `window.localStorage.setItem('${key}','${value}')`
    );
    await this.world.page?.reload();
  }
}
