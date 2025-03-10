import { Component } from '@angular/core';
import {SignUpFormComponent} from "../../forms/sign-up-form/sign-up-form.component";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    SignUpFormComponent
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

}
