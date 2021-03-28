import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AppUser } from '../../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authUser: AppUser | null = null;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.authUserSubject.subscribe({
      next: (v) => (this.authUser = v),
    });
  }

  async loadData() {}
}
