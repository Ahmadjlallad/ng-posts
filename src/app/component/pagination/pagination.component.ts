import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsServes } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit, OnDestroy {
  postsNumbers = 0;
  currentParam = 1;
  currentParamSub: any;
  constructor(
    private postsService: PostsServes,
    public router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentParamSub = this.postsService.changePagination.subscribe({
      next: (num) => {
        this.postsNumbers = Math.ceil(num / 6);
      },
    });
    this.router.params.subscribe({
      next: (param) => {
        this.currentParam = param['pageId'] ?? 1;
      },
    });
  }
  ngOnDestroy(): void {
    (this.currentParamSub as Subscription).unsubscribe();
  }
}
