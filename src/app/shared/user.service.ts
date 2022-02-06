import { Injectable } from '@angular/core';
import { User } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];
}
