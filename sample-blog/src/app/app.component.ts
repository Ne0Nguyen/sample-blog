import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MenuItem} from "primeng/api";
import {MenubarModule} from "primeng/menubar";
import {NgClass, NgIf} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {InputTextModule} from "primeng/inputtext";
import {Ripple} from "primeng/ripple";
import {Button} from "primeng/button";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {BannerComponent} from "./components/banner/banner.component";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "./services/auth/auth.service";
import {ToastModule} from "primeng/toast";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenubarModule, NgClass, AvatarModule, InputTextModule, NgIf, Ripple, Button, MenuBarComponent, BannerComponent, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'sample-blog';
  isLogin = false;
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);

  constructor() {
    this.authService.login$.subscribe(state => this.isLogin = state);
  }
  ngOnInit() {}
}

