import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {NgForOf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {ConfirmationService, MessageService, PrimeTemplate} from "primeng/api";
import {PostService} from "../../../services/post/post.service";
import {Router} from "@angular/router";
import {Post} from "../../../interface/post.interface";
import {User} from "../../../interface/user.interface";
import {capitalizeFirstWord} from "../../../utils/string-utils";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-my-post',
  standalone: true,
  imports: [
    CardModule,
    NgForOf,
    PaginatorModule,
    PrimeTemplate,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './my-post.component.html',
  styleUrl: './my-post.component.scss'
})
export class MyPostComponent implements OnInit {

  postService: PostService = inject(PostService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  messageService: MessageService = inject(MessageService);
  router = inject(Router);

  postList: Post[] = [];
  paginatedPostList: Post[] = [];
  pageSize = 10;
  currentPage = 0;

  userList: User[] = [];

  ngOnInit() {
    this.getPostList();
  }

  getPostList = () => {
    this.postService.getPostListByUserId().subscribe(posts => {
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

  deletePost = (event: any, id: number | undefined) => {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        if (id) {
          this.postService.deletePost(id).subscribe()
        }
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'Record deleted'});
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
      }
    });
  }

  editPost = (id: number | undefined) => {
    this.router.navigateByUrl(`post/${id}/edit`);
  }
}
