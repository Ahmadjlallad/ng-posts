import { Injectable } from '@angular/core';
import { Comment, Post } from './post.interface';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostsServes {
  constructor(private http: HttpClient) {}
  changePagination = new Subject<number>();
  posts: Post[] = [];
  getPosts() {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
  getPost(postId: number) {
    return this.posts.find(({ id }) => id === postId);
  }
  getComments(postId: number) {
    return this.http.get<Comment[]>(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
  }
}
