import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { User } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userId: number) {
    return this.http.get<User>(
      'https://jsonplaceholder.typicode.com/users/' + userId
    );
  }
}
