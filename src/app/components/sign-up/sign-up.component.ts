import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthData } from 'src/app/models/authData.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignupComponent implements OnInit {
  isLoading = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    const newUser = form.value;
    this.authService.createUser(newUser);
  }
}
