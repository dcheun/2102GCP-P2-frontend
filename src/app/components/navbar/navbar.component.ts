import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { StoreService } from 'src/app/services/store.service';
import { AppUser } from '../../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authUser: AppUser | null = null;
  avatarURL: string = '../../../assets/images/avatar1.jpg';
  searchTerm: string = '';

  constructor(
    private storeService: StoreService,
    private sharedService: SharedService,
    private authService: AuthService,
    private appUserService: AppUserService
  ) {}

  ngOnInit(): void {
    this.generateAvatarURL();
    this.authUser = this.storeService.authUser;
    this.storeService.authUserSubject.subscribe({
      next: (v) => (this.authUser = v),
    });
    this.loadUser();
  }

  async loadUser(): Promise<void> {
    if (this.authUser) {
      return;
    }
    const userId = this.authService.getJwtId();
    if (!userId) {
      return;
    }
    try {
      this.authUser = await this.appUserService.getAppUserById(userId);
      this.storeService.authUserSubject.next(this.authUser);
    } catch (err) {
      console.log(err);
    } finally {
    }
  }

  generateAvatarURL(): void {
    const randInt = this.sharedService.genRandomInt(1, 9);
    this.avatarURL = `../../../assets/images/avatar${randInt}.jpg`;
  }

  logout() {
    this.authService.signout();
    this.storeService.authUserSubject.next(undefined);
  }

  search() {
    console.log('navbar searchTerm=', this.searchTerm);
    this.storeService.searchSubject.next(this.searchTerm);
  }
}
