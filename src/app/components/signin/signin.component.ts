import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  hide: boolean = true;
  email: string = '';
  pw: string = '';
  loading: boolean = false;
  errMsg: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async signin() {
    this.errMsg = '';
    this.loading = true;
    try {
      const signInSuccess = await this.authService.signin(this.email, this.pw);
      if (!signInSuccess) {
        throw new Error('Unable to signin');
      }
      this.email = '';
      this.pw = '';
      this.router.navigateByUrl('/');
    } catch (err) {
      this.errMsg = 'Login Failed';
    } finally {
      this.loading = false;
    }
  }
}
