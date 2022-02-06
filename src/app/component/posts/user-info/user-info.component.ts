import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { User } from 'src/app/shared/post.interface';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit, OnChanges {
  @Input('userId') userId: number;
  user: User;
  constructor(private userService: UserService) {}
  ngOnChanges(): void {
    this.userService.getUser(this.userId).subscribe({
      next: (data) => {
        this.user = data;
      },
    });
  }
  ngOnInit(): void {}
}
