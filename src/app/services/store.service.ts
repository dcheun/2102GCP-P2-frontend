import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AppUser } from '../models/app-user';
import { Course } from '../models/course';
import { CourseMaterial } from '../models/course-material';
import { Rating } from '../models/rating';
import { AppUserService } from './app-user.service';
import { CourseMaterialService } from './course-material.service';
import { CourseService } from './course.service';
import { RatingService } from './rating.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  authUserSubject = new Subject<AppUser>();
  appUsersSubject = new Subject<AppUser[]>();
  coursesSubject = new Subject<Course[]>();
  courseMaterialsSubject = new Subject<CourseMaterial[]>();
  ratingsSubject = new Subject<Rating[]>();
  loadingSubject = new Subject<boolean>();

  authUser: AppUser | null = null;
  appUsers: AppUser[] = [];
  courses: Course[] = [];
  courseMaterials: CourseMaterial[] = [];
  ratings: Rating[] = [];

  loading: boolean = false;

  constructor(
    private appUserService: AppUserService,
    private courseService: CourseService,
    private courseMaterialService: CourseMaterialService,
    private ratingService: RatingService,
    private toastr: ToastrService
  ) {
    console.log('store.service - subscribing subjects');
    this.authUserSubject.subscribe({
      next: (v) => (this.authUser = v),
    });
    this.appUsersSubject.subscribe({
      next: (v) => (this.appUsers = v),
    });
    this.coursesSubject.subscribe({
      next: (v) => (this.courses = v),
    });
    this.courseMaterialsSubject.subscribe({
      next: (v) => (this.courseMaterials = v),
    });
    this.ratingsSubject.subscribe({
      next: (v) => (this.ratings = v),
    });
    this.loadingSubject.subscribe({
      next: (v) => (this.loading = v),
    });
    console.log('store.service - calling loadData');
    this.loadData();
  }

  async loadData(): Promise<void> {
    let appUsers, courses, courseMaterials, ratings;
    this.loadingSubject.next(true);
    try {
      appUsers = await this.appUserService.getAllAppUsers();
      courses = await this.courseService.getAllCourses();
      courseMaterials = await this.courseMaterialService.getAllCourseMaterials();
      ratings = await this.ratingService.getAllRatings();
    } catch (err) {
      console.log(err);
      this.toastr.error(
        err.error?.message ? err.error.message : err.message,
        'Unable to load data'
      );
    } finally {
      this.loadingSubject.next(false);
    }
    console.log('store.service - calling subject.next');
    this.appUsersSubject.next(appUsers);
    this.coursesSubject.next(courses);
    this.courseMaterialsSubject.next(courseMaterials);
    this.ratingsSubject.next(ratings);
    console.log('store.service - appUsers -', this.appUsers);
    console.log('store.service - courses -', this.courses);
    console.log('store.service - courseMaterials -', this.courseMaterials);
    console.log('store.service - ratings -', this.ratings);
  }
}
