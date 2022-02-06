import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsServes } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  postsNumbers = 0;
  currentParam = 1;
  constructor(
    private postsService: PostsServes,
    public router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.postsService.changePagination.subscribe({
      next: (num) => {
        this.postsNumbers = Math.ceil(num / 6);
        console.log(this.postsNumbers, this.currentParam);
      },
    });
    this.router.params.subscribe({
      next: (param) => {
        this.currentParam = param['pageId'] ?? 1;
      },
    });
  }
}
