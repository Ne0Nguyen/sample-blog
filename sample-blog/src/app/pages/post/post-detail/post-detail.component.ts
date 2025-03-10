import {Component, inject, OnInit} from '@angular/core';
import {CardModule} from "primeng/card";
import {PrimeTemplate} from "primeng/api";
import {PostService} from "../../../services/post/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post, PostComment} from "../../../interface/post.interface";
import {NgForOf} from "@angular/common";
import {AvatarModule} from "primeng/avatar";
import {PostEditFormComponent} from "../../../forms/post-edit-form/post-edit-form.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CardModule,
    PrimeTemplate,
    NgForOf,
    AvatarModule,
    PostEditFormComponent
  ],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent implements OnInit {
  postService: PostService = inject(PostService);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  id: number = 0;
  postDetail: Post = {};
  postComments: PostComment[] = [];
  isEdit: boolean = false;

  constructor() {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.getPostDetail();
    this.getPostComment();
    if (this.router.url.includes('edit')) {
      this.isEdit = true;
    }
  }

  getPostDetail() {
    this.postService.getPostDetail(this.id).subscribe(post => {
      this.postDetail = post;
    })
  }

  getPostComment() {
    this.postService.getPostComment(this.id).subscribe(comments => {
      this.postComments = comments;
    })
  }

}
