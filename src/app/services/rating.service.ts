import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../models/rating';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  BASE_URL: string;

  constructor(private sharedService: SharedService, private http: HttpClient) {
    this.BASE_URL = sharedService.BASE_URL;
  }

  // Create
  async createRating(rating: Rating, token: string): Promise<Rating> {
    rating = await this.http
      .post<Rating>(`${this.BASE_URL}/ratings`, rating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .toPromise();
    return rating;
  }

  // Read
  async getRatingById(id: number): Promise<Rating> {
    const rating = await this.http
      .get<Rating>(`${this.BASE_URL}/ratings/${id}`)
      .toPromise();
    return rating;
  }

  async getAllRatings(): Promise<Rating[]> {
    const ratings = await this.http
      .get<Rating[]>(`${this.BASE_URL}/ratings`)
      .toPromise();
    return ratings;
  }

  // Update
  async updateRating(rating: Rating, token: string): Promise<Rating> {
    rating = await this.http
      .put<Rating>(`${this.BASE_URL}/ratings/${rating.id}`, rating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .toPromise();
    return rating;
  }

  // Delete
  async deleteRatingById(id: number, token: string): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/ratings/${id}`, {
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
