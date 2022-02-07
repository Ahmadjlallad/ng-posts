import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './post.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  users: User[] = [];
  getUser(userId: number) {
    return this.http.get<User>(
      'https://jsonplaceholder.typicode.com/users/' + userId
    );
  }
}
