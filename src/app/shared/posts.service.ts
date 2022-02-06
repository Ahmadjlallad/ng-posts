import { Injectable } from '@angular/core';
import { Post } from './post.interface';
import { Subject } from 'rxjs';

@Injectable()
export class PostsServes {
  changePagination = new Subject<number>();

  posts: Post[] = [];
  pagination = 0;
}
