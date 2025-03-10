import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {Button} from "primeng/button";
import {AuthService} from "../../services/auth/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AutoCompleteModule,
    FloatLabelModule,
    InputTextModule,
    Button
  ],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  authService: AuthService = inject(AuthService);
  messageService: MessageService = inject(MessageService);

  ngOnInit(): void {
    this.initForm();
  }

  initForm = () => {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  submitForm() {
    const name = this.formGroup.controls['name'].value;
    const password = this.formGroup.controls['password'].value;
    this.authService.login(name, password);
  }


}
