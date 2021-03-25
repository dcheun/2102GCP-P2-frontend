import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Create
  async createRating(rating: Rating): Promise<Rating> {
    rating = await this.http
      .post<Rating>(`${this.BASE_URL}/ratings`, rating)
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
  async updateRating(rating: Rating): Promise<Rating> {
    rating = await this.http
      .put<Rating>(`${this.BASE_URL}/ratings/${rating.id}`, rating)
      .toPromise();
    return rating;
  }

  // Delete
  async deleteRatingById(id: number): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/ratings/${id}`, {
        responseType: 'text',
      })
      .toPromise();
    console.log(res);
    return true;
  }
}
