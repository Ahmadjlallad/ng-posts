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
  checkIfUserStored() {
    const checkUser = this.userService.users.find(
      ({ id }) => id === this.userId
    );
    if (checkUser) {
      this.user = checkUser;
    } else
      this.userService.getUser(this.userId).subscribe({
        next: (data) => {
          this.user = data;
          this.userService.users.push(data);
        },
      });
  }
  ngOnChanges(): void {
    this.checkIfUserStored();
  }
  ngOnInit(): void {}
}
