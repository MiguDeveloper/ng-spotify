import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@module/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  errorSession = false;
  formLogin: FormGroup = new FormGroup({});
  date = new Date();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        [
          Validators.minLength(6),
          Validators.maxLength(12),
          Validators.required,
        ],
      ],
    });

    console.log(this.date);
  }

  sendLogin() {
    const formBody = this.formLogin.value;
    const { email, password } = formBody;
    this.authService.sendCredentials$(email, password).subscribe(
      (data) => {
        console.log(data);
        const { tokenSession } = data;
        this.cookieService.set('token', tokenSession, 4, '/');
        this.router.navigate(['/', 'tracks']);
      },
      (err) => {
        this.errorSession = true;
        console.log('hubo un error', err);
      }
    );
  }
}
