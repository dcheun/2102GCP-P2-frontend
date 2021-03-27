import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  BASE_URL: string;

  constructor(private sharedService: SharedService, private http: HttpClient) {
    this.BASE_URL = sharedService.BASE_URL;
  }

  // Create
  async createCourse(course: Course, token: string): Promise<Course> {
    course = await this.http
      .post<Course>(`${this.BASE_URL}/courses`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
  async updateCourse(course: Course, token: string): Promise<Course> {
    course = await this.http
      .put<Course>(`${this.BASE_URL}/courses/${course.id}`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .toPromise();
    return course;
  }

  // Delete
  async deleteCourseById(id: number, token: string): Promise<boolean> {
    const res: string = await this.http
      .request('DELETE', `${this.BASE_URL}/courses/${id}`, {
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
