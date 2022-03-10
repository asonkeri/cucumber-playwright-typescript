import { expect } from "@playwright/test";
import axios from "axios";

interface APIResourceResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export class PostsClient {
  url = "https://jsonplaceholder.typicode.com/posts";

  async createPost(title: string, body: string) {
    const response = await axios.post<APIResourceResponse>(this.url, {
      title: title,
      body: body,
    });
    expect(response.status).toEqual(201);
    return response;
  }

  async modifyPost(id: number, title: string, body: string) {
    const response = await axios.put<APIResourceResponse>(`${this.url}/${id}`, {
      id: id,
      title: title,
      body: body,
      userId: 1,
    });
    expect(response.status).toEqual(200);
    return response;
  }

  async getPost(id: number) {
    const response = await axios.get<APIResourceResponse>(`${this.url}/${id}`);
    expect(response.status).toEqual(200);
    return response;
  }
}
