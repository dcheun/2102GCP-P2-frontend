import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  user: AppUser | null = null;
  userId: number | null = null;
  userRoleId: number | null = null;
  loading: boolean = false;

  constructor(
    private appUserService: AppUserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.getToken()) {
      return;
    }
    this.userId = this.authService.getJwtId();
    this.userRoleId = this.authService.getJwtUserRoleId();
    this.loadUser();
  }

  async loadUser(): Promise<void> {

    if (!this.userId) {
      return;
    }
    this.loading = true;
    try {
      this.user = await this.appUserService.getAppUserById(this.userId);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  async updateUser(): Promise<void> {
    let token: string | null = this.authService.getToken();
    if (!this.user || !token) {
      return;
    }

    this.loading = true;
    try {
      this.user = await this.appUserService.updateAppUser(this.user, token);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }
}
