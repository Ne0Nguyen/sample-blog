import {ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Button} from "primeng/button";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Post} from "../../interface/post.interface";
import {ConfirmationService, MessageService} from "primeng/api";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PostService} from "../../services/post/post.service";
import {Router} from "@angular/router";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-post-edit-form',
  standalone: true,
  imports: [
    Button,
    FloatLabelModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './post-edit-form.component.html',
  styleUrl: './post-edit-form.component.scss'
})
export class PostEditFormComponent implements OnInit, OnChanges {
  @Input() post: Post = {};

  formGroup: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
  });
  messageService: MessageService = inject(MessageService);
  postService: PostService = inject(PostService);
  confirmationService: ConfirmationService = inject(ConfirmationService);
  router: Router = inject(Router);
  cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'] && changes['post'].currentValue) {
      const data = changes['post'].currentValue;
      if (this.formGroup) {
        this.formGroup.patchValue({
          title: data.title,
          body: data.body,
        });
      }
    }
    this.cd.detectChanges();
  }

  submitForm(event: any) {
    const title = this.formGroup.controls['title'].value;
    const body = this.formGroup.controls['body'].value;
    const userId = Number(localStorage.getItem('userId'));
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon:"none",
      rejectIcon:"none",
      rejectButtonStyleClass:"p-button-text",

      accept: () => {
        this.postService.updatePost({
          id: this.post.id,
          title: title,
          body: body,
          userId: userId
        }).subscribe()
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
