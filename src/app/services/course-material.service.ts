import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseMaterial } from '../models/course-material';

@Injectable({
  providedIn: 'root',
})
export class CourseMaterialService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Create
  async createCourseMaterial(
    courseMaterial: CourseMaterial
  ): Promise<CourseMaterial> {
    courseMaterial = await this.http
      .post<CourseMaterial>(`${this.BASE_URL}/coursematerials`, courseMaterial)
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
    courseMaterial: CourseMaterial
  ): Promise<CourseMaterial> {
    courseMaterial = await this.http
      .put<CourseMaterial>(
        `${this.BASE_URL}/coursematerials/${courseMaterial.id}`,
        courseMaterial
      )
      .toPromise();
    return courseMaterial;
  }

  // Delete
  async deleteCourseMaterialById(id: number): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/coursematerials/${id}`, {
        responseType: 'text',
      })
      .toPromise();
    console.log(res);
    return true;
  }
}
