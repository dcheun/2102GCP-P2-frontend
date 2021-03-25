import { Component, OnInit } from '@angular/core';
import { AppUser } from '../../models/app-user';
import { AppUserService } from '../../services/app-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private appUserService: AppUserService) {}

  ngOnInit(): void {
    // this.loadData();
  }

  async loadData() {
    const appUser = await this.appUserService.getAppUserById(6);
    console.log(appUser);
  }
}
