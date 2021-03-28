import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  BASE_URL: string;

  constructor(private sharedService: SharedService, private http: HttpClient) {
    this.BASE_URL = sharedService.BASE_URL;
  }

  // Create
  async createAppUser(appUser: AppUser): Promise<AppUser> {
    appUser = await this.http
      .post<AppUser>(`${this.BASE_URL}/users`, appUser)
      .toPromise();
    return appUser;
  }

  // Read
  async getAppUserById(id: number): Promise<AppUser> {
    const appUser = await this.http
      .get<AppUser>(`${this.BASE_URL}/users/${id}`)
      .toPromise();
    return appUser;
  }

  async getAllAppUsers(): Promise<AppUser[]> {
    const appUsers = await this.http
      .get<AppUser[]>(`${this.BASE_URL}/users`)
      .toPromise();
    return appUsers;
  }

  // Update
  async updateAppUser(appUser: AppUser, token: string): Promise<AppUser> {
    appUser = await this.http
      .put<AppUser>(`${this.BASE_URL}/users/${appUser.id}`, appUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .toPromise();
    return appUser;
  }

  // Delete
  async deleteAppUserById(id: number, token: string): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'text',
      })
      .toPromise();
    console.log(res);
    return true;
  }
}
