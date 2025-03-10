import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {MenubarModule} from "primeng/menubar";
import {NgClass, NgIf} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {Ripple} from "primeng/ripple";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [
    MenubarModule,
    NgClass,
    AvatarModule,
    NgIf,
    Ripple
  ],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss'
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] | undefined;
  authService: AuthService = inject(AuthService);
  isLogin: boolean = false;

  constructor(
    private cd: ChangeDetectorRef,
  ) {
    this.authService.login$.subscribe(state => {
      this.isLogin = state;
      this.updateMenu()
    })
  }

  ngOnInit() {
    this.updateMenu()
  }

  updateMenu() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'post'
      },
    ]
    const loginItem: MenuItem[] = [
      {
        label: 'My Post',
        icon: 'pi pi-search',
        routerLink: 'my-post'
      },
      {
        label: 'Logout',
        command: () => {
          this.logout();
        }
      },
    ];
    if (this.isLogin) {
      this.items = [
        ...this.items,
        ...loginItem
      ]
    }

    this.cd.detectChanges()
  }

  logout() {
    this.authService.logout();
    this.updateMenu();
  }
}
