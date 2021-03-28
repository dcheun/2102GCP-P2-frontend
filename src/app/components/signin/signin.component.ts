import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user.service';
import { AuthService } from 'src/app/services/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, OnDestroy {
  // authUser: AppUser | null = null;
  authUserSub: Subscription | null = null;
  hide: boolean = true;
  email: string = '';
  pw: string = '';
  loading: boolean = false;
  errMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private appUserService: AppUserService,
    private storeService: StoreService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // this.authUserSub = this.storeService.authUserSubject.subscribe({
    //   next: v => this.authUser = v
    // });
  }

  ngOnDestroy(): void {
    this.authUserSub?.unsubscribe();
  }

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
      // Fetch user object.
      const userId = this.authService.getJwtId();
      if (!userId) {
        throw new Error('Unable to get token');
      }
      const authUser = await this.appUserService.getAppUserById(userId);
      this.storeService.authUserSubject.next(authUser);
      // Display welcome toast and redirect to home page.
      this.toastr.info(
        'Enjoy your learning experience!',
        `Welcome back ${authUser.fName}!`
      );
      this.router.navigateByUrl('/');
    } catch (err) {
      this.errMsg = 'Login Failed';
    } finally {
      this.loading = false;
    }
  }
}
