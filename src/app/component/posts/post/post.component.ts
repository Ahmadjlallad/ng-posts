import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, Post, User } from 'src/app/shared/post.interface';
import { PostsServes } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = { id: 1, body: '', title: '', userId: 1 };
  @Input() isPost = true;

  user: User;
  comments: Comment[] = [];
  constructor(
    private postService: PostsServes,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.post = this.postService.getPost(+this.route.snapshot.params['postId']);
    this.postService
      .getComments(+this.route.snapshot.params['postId'])
      .subscribe((data) => {
        console.log(data);
        this.comments = data;
      });
  }
}
/*
{
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
*/
