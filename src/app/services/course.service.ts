import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  BASE_URL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Create
  async createCourse(course: Course): Promise<Course> {
    course = await this.http
      .post<Course>(`${this.BASE_URL}/courses`, course)
      .toPromise();
    return course;
  }

  // Read
  async getCourseById(id: number): Promise<Course> {
    const course = await this.http
      .get<Course>(`${this.BASE_URL}/courses/${id}`)
      .toPromise();
    return course;
  }

  async getAllCourses(): Promise<Course[]> {
    const courses = await this.http
      .get<Course[]>(`${this.BASE_URL}/courses`)
      .toPromise();
    return courses;
  }

  // Update
  async updateCourse(course: Course): Promise<Course> {
    course = await this.http
      .put<Course>(`${this.BASE_URL}/courses/${course.id}`, course)
      .toPromise();
    return course;
  }

  // Delete
  async deleteCourseById(id: number): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/courses/${id}`, {
        responseType: 'text',
      })
      .toPromise();
    console.log(res);
    return true;
  }
}
