import { Given, Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { PostsClient } from "../api/posts";
import { ICustomWorld } from "../support/custom-world";

const client = new PostsClient();

Given(
  "Post {string} Is Created With Body {string}",
  async function (this: ICustomWorld, title: string, body: string) {
    await client.createPost(title, body);
  }
);

When(
  "Post {string} Is Modified With Body {string}",
  async function (this: ICustomWorld, title: string, body: string) {
    await client.modifyPost(1, title, body);
  }
);

Then(
  "Post {string} Has Body {string}",
  async function (this: ICustomWorld, title: string, body: string) {
    const response = await client.getPost(1);

    // These assertions will fail 
    expect(response.data.title).toEqual(title);
    expect(response.data.body).toEqual(body);
  }
);
