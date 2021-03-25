import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AppUserService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

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

  // Update
  async updateAppUser(appUser: AppUser): Promise<AppUser> {
    appUser = await this.http
      .put<AppUser>(`${this.BASE_URL}/users/${appUser.id}`, appUser)
      .toPromise();
    return appUser;
  }

  // Delete
  async deleteAppUserById(id: number): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/users/${id}`, {
        responseType: 'text',
      })
      .toPromise();
    console.log(res);
    return true;
  }
}
