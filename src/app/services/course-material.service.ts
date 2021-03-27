import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseMaterial } from '../models/course-material';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class CourseMaterialService {
  BASE_URL: string;

  constructor(private sharedService: SharedService, private http: HttpClient) {
    this.BASE_URL = sharedService.BASE_URL;
  }

  // Create
  async createCourseMaterial(
    courseMaterial: CourseMaterial,
    token: string
  ): Promise<CourseMaterial> {
    courseMaterial = await this.http
      .post<CourseMaterial>(
        `${this.BASE_URL}/coursematerials`,
        courseMaterial,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .toPromise();
    return courseMaterial;
  }

  // Read
  async getCourseMaterialById(id: number): Promise<CourseMaterial> {
    const courseMaterial = await this.http
      .get<CourseMaterial>(`${this.BASE_URL}/coursematerials/${id}`)
      .toPromise();
    return courseMaterial;
  }

  async getAllCourseMaterials(): Promise<CourseMaterial[]> {
    const courseMaterials = await this.http
      .get<CourseMaterial[]>(`${this.BASE_URL}/coursematerials`)
      .toPromise();
    return courseMaterials;
  }

  // Update
  async updateCourseMaterial(
    courseMaterial: CourseMaterial,
    token: string
  ): Promise<CourseMaterial> {
    courseMaterial = await this.http
      .put<CourseMaterial>(
        `${this.BASE_URL}/coursematerials/${courseMaterial.id}`,
        courseMaterial,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .toPromise();
    return courseMaterial;
  }

  // Delete
  async deleteCourseMaterialById(id: number, token: string): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/coursematerials/${id}`, {
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
