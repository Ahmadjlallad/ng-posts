import { Injectable } from '@angular/core';
import { Comment, Post } from './post.interface';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class PostsServes {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  changePagination = new Subject<number>();
  currentPage = 1;
  posts: Post[] = [];
  allPosts: Post[] = [];
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
  // checkPagination(data: Post[], slicedPost: Post[]) {
  //   slicedPost = data.slice(0, 6);
  //   this.posts = data;
  //   this.changePagination.next(data.length);
  //   this.route.params.subscribe((param) => {
  //     this.currentPage = +param['pageId'];
  //     slicedPost = this.posts.slice(
  //       (+param['pageId'] - 1) * 6,
  //       +param['pageId'] * 6
  //     );
  //   });
  // }
}
