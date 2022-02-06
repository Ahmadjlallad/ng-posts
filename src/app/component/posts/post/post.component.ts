import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment, Post, User } from 'src/app/shared/post.interface';
import { PostsServes } from 'src/app/shared/posts.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = { id: 1, body: '', title: '', userId: 1 };
  @Input() isPost = true;

  user: User = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    company: {
      name: 'Romaguera-Crona',
      catchPhrase: 'Multi-layered client-server neural-net',
      bs: 'harness real-time e-markets',
    },
  };
  comments: Comment[] = [];
  constructor(
    private postService: PostsServes,
    private http: HttpClient,
    private route: ActivatedRoute,
    private usersService: UserService
  ) {}

  ngOnInit(): void {
    this.getPost();
    this.getUser();
    this.getComments();
  }
  getComments() {
    if (this.isPost) {
      this.http
        .get<Comment[]>(
          `https://jsonplaceholder.typicode.com/posts/${this.route.snapshot.params['postId']}/comments`
        )
        .subscribe((data) => {
          this.comments = data;
        });
    }
  }
  getPost() {
    if (this.isPost && this.route.snapshot.params['postId']) {
      this.post = this.postService.posts.find(
        ({ id }) => id === +this.route.snapshot.params['postId']
      ) as Post;
      console.log(this.post);
    }
  }
  getUser() {
    const checkUser = this.usersService.users.find(
      ({ id }) => id === this.post.userId
    );
    if (checkUser) this.user = checkUser;
    else
      this.http
        .get<User>(
          'https://jsonplaceholder.typicode.com/users/' + this.post.userId
        )
        .subscribe((data) => {
          this.usersService.users.push(data);
          this.user = data;
        });
  }
}
