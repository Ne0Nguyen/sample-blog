import {Routes} from '@angular/router';
import {ListComponent} from "./pages/post/list.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'post',
    pathMatch: 'full',
  },
  {
    path: 'post',
    loadComponent: () => import("./pages/post/list.component").then(m => m.ListComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () => import("./pages/post/post-detail/post-detail.component").then(m => m.PostDetailComponent),
  },
  {
    path: 'post/:id/edit',
    loadComponent: () => import("./pages/post/post-detail/post-detail.component").then(m => m.PostDetailComponent),
  },
  {
    path: 'my-post',
    loadComponent: () => import("./pages/post/my-post/my-post.component").then(m => m.MyPostComponent),
  }
];
