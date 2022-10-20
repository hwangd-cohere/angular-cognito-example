import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loading: boolean;
  user: IUser;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signIn(): void {
    if (this.form.valid) {
      console.log('user: ' + JSON.stringify(this.user));
      this.submitEM.emit(this.form.value);
      this.loading = true;
      this.cognitoService
        .signIn(this.user)
        .then(() => {
          this.router.navigate(['/profile']);
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  @Input() error: string | null | undefined;

  @Output() submitEM = new EventEmitter();
}
