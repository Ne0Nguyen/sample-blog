import {Component, inject, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {PostService} from "../../services/post/post.service";
import {Post} from "../../interface/post.interface";
import {capitalizeFirstWord} from "../../utils/string-utils";
import {CardModule} from "primeng/card";
import {PaginatorModule} from "primeng/paginator";
import {UserService} from "../../services/user/user.service";
import {User} from "../../interface/user.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CarouselModule,
    CardModule,
    PaginatorModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  postService: PostService = inject(PostService);
  userService: UserService = inject(UserService);
  router = inject(Router);

  postList: Post[] = [];
  paginatedPostList: Post[] = [];
  pageSize = 10;
  currentPage = 0;

  userList: User[] = [];

  ngOnInit() {
    this.getUserList();
    this.getPostList();
  }

  getUserList = () => {
    this.userService.getUserList().subscribe(users => {
      this.userList = users
    });
  }

  getPostList = () => {
    this.postService.getPostList().subscribe(posts => {
      this.postList = posts.map(item => {
        return {
          ...item,
          title: capitalizeFirstWord(item.title),
          userName: this.userList.find(user => user.id === item.userId)?.name
        }
      });
      this.updatePaginatedPosts();
    })
  }

  updatePaginatedPosts() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPostList = this.postList.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    this.currentPage = event.page;
    this.updatePaginatedPosts();
  }

  openPostDetail = (id: number | undefined) => {
    if (id) {
      this.router.navigateByUrl(`post/${id}`);
    }
  }
}
