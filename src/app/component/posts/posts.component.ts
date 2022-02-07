import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    public postsService: PostsServes,
    private route: ActivatedRoute
  ) {}
  posts: Post[] = [];
  goToPost(postId: number) {
    this.router.navigate(['posts', postId]);
  }
  userTrackBy(_: number, post: Post) {
    return post.id + post.userId;
  }
  checkPagination(data: Post[]) {
    this.posts = data.slice(0, 6);
    this.postsService.posts = data;
    this.postsService.changePagination.next(data.length);
    this.route.params.subscribe((param) => {
      this.postsService.currentPage = +param['pageId'];
      this.posts = this.postsService.posts.slice(
        (+param['pageId'] - 1) * 6,
        +param['pageId'] * 6
      );
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (query) => {
        if (query['search']) {
          const filter = this.postsService.posts.filter(
            ({ title, body }) =>
              body.includes(query['search']) ?? title.includes(query['search'])
          );
          this.checkPagination(filter);
        } else this.checkPagination(this.postsService.allPosts);
      },
    });
    this.postsService.getPosts().subscribe((data) => {
      this.checkPagination(data);
      this.postsService.allPosts = data;
    });
  }
}
/*
 {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    },
*/
