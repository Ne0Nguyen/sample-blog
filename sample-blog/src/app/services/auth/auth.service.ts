import {inject, Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login$ = new BehaviorSubject<boolean>(false);
  messageService: MessageService = inject(MessageService);
  router: Router = inject(Router);


  constructor() {
  }

  isAuthenticated = () => {
    return !!localStorage.getItem("userId");
  }

  login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('userId', '1');
      this.login$.next(true);
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully logged in',
      })
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Login failed',
      })
    }
  }

  logout = () => {
    localStorage.removeItem('userId');
    this.messageService.add({
      severity: 'info',
      summary: 'Logged out',
      detail: 'You have logged out',
    })
    this.login$.next(false);
    this.router.navigate(['/']);
  }
}
