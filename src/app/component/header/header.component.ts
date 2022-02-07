import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsServes } from 'src/app/shared/posts.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  checkSearch = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostsServes
  ) {}
  search(e: NgForm) {
    this.router.navigate(['/page/' + this.postService.currentPage], {
      relativeTo: this.route,
      queryParams: { search: e.value.search },
    });
  }
  clearSearch = () => {
    this.router.navigate(['/page/' + this.postService.currentPage]);
  };
  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: (query) => {
        if (query['search']) this.checkSearch = true;
        else this.checkSearch = false;
      },
    });
  }
}
