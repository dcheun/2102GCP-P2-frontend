import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/models/app-user';
import { Course } from 'src/app/models/course';
import { Rating } from 'src/app/models/rating';
import { AppUserService } from 'src/app/services/app-user.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { RatingService } from 'src/app/services/rating.service';
import { SharedService } from 'src/app/services/shared.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css'],
})
export class CourseTableComponent implements OnInit {
  course: Course | null = null;
  instructor: AppUser | null = null;
  users: AppUser[] = [];
  ratings: Rating[] = [];
  courseId: number = 0;
  loading: boolean = true;
  imgURL: string = '../../../assets/images/course14.jpg';

  constructor(
    private appUserService: AppUserService,
    private acRoute: ActivatedRoute,
    private storeService: StoreService,
    private courseService: CourseService,
    private sharedService: SharedService,
    private ratingService: RatingService,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.courseId = this.acRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.generateCourseImg();
    this.loadData();
  }

  async loadData() {
    this.loading = true;
    try {
      this.course = await this.courseService.getCourseById(this.courseId);
      this.users = await this.appUserService.getAllAppUsers();
      this.instructor =
        this.users.find((u) => u.id === this.course?.instructorId) || null;
      const allRatings = await this.ratingService.getAllRatings();
      this.ratings = allRatings.filter((r) => r.courseId === this.course?.id);
      console.log('course-detail: ratings=', this.ratings);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  generateCourseImg(): void {
    const randInt = this.sharedService.genRandomInt(1, 18);
    this.imgURL = `../../../assets/images/course${randInt}.jpg`;
  }

  async enroll() {
    if (!this.course) {
      this.toastr.error('Unable to enroll in course', 'Enrollment Failure');
      this.router.navigateByUrl('/');
      return;
    }
    const authUser = this.storeService.authUser;
    if (!authUser) {
      this.router.navigateByUrl('/signin');
      return;
    }

    // Check if student already registered.
    const found = authUser.studentCourses.find((c) => c.id === this.course?.id);
    if (found) {
      this.toastr.warning(
        'You are already enrolled in this course',
        'Unable to Enroll'
      );
      this.router.navigateByUrl('/');
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      this.router.navigateByUrl('/signin');
      return;
    }
    if (this.authService.getJwtId() !== authUser.id) {
      this.router.navigateByUrl('/signin');
      return;
    }

    // Add course for user.
    authUser.studentCourses.push(this.course);
    this.loading = true;
    try {
      const updatedUser = await this.appUserService.updateAppUser(
        authUser,
        token
      );
      // Notify store of changes.
      this.storeService.authUserSubject.next(updatedUser);
      this.toastr.success(
        'Congrats on your next learning adventure!',
        'Successfully Enrolled'
      );
      this.router.navigateByUrl('/');
    } catch (err) {
      console.log(err);
      this.toastr.error(
        err.error?.message ? err.error.message : err.message,
        'Enrollment Failure'
      );
    } finally {
      this.loading = false;
    }
  }
}
