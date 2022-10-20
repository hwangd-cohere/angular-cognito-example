import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  user: IUser;

  constructor(private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public ngOnInit(): void {
    this.cognitoService.getUser().then((user: any) => {
      this.user = user.attributes;
    });
  }

  public update(): void {
    this.loading = true;
    console.log('updating profile');
    this.cognitoService
      .updateUser(this.user)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
  });
}
