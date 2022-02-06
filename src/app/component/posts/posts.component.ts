import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post } from 'src/app/shared/post.interface';
import { PostsServes } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  filter: Post[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public postsService: PostsServes,
    private http: HttpClient
  ) {}
  posts: Post[] = [
    {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
  ];
  goToPost(postId: number) {
    this.router.navigate(['posts', postId]);
  }
  userTrackBy(index: number, post: Post) {
    return post.id + post.userId;
  }
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        if (params['pageId'] && this.postsService.posts.length > 1) {
          this.posts = this.postsService.posts.slice(
            +params['pageId'] - 1,
            +params['pageId'] + 5
          );
        }
      },
    });
    if (
      this.route.snapshot.params['pageId'] &&
      this.postsService.posts.length > 1
    ) {
      this.posts = this.postsService.posts.slice(
        +this.route.snapshot.params['pageId'] - 1,
        +this.route.snapshot.params['pageId'] + 6
      );
    } else
      this.http
        .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
        .subscribe((data) => {
          this.posts = data.slice(0, 6);
          this.postsService.posts = data;
          this.postsService.changePagination.next(data.length);
        });
  }
}
