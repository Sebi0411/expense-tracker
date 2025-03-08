import { Injectable } from '@angular/core';

interface User {
  email: string;
  password: string;
  nickname: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    {
      email: 'admin@admin.com',
      password: 'admin1',
      nickname: 'Admin',
    },
  ];
  private currentUser: User | null = null;

  constructor() {
    const users = localStorage.getItem('users');
    if (users) {
      this.users = JSON.parse(users);
    }
  }

  signup(email: string, password: string, nickname: string): boolean {
    if (this.users.find((user) => user.email === email)) {
      return false;
    }
    const newUser: User = { email, password, nickname };
    this.users.push(newUser);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return (
      this.currentUser ||
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
