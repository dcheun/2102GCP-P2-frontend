import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/models/app-user';
import { Course } from 'src/app/models/course';
import { CourseMaterial } from 'src/app/models/course-material';
import { Rating } from 'src/app/models/rating';
import { AppUserService } from 'src/app/services/app-user.service';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { StoreService } from 'src/app/services/store.service';

interface cardProps {
  [index: string]: any;
  course: Course | null;
  instructor: AppUser | null;
  courseRating: number;
  courseTotalRating: number;
  authUser: AppUser | null;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userId: number | null = null;
  userRoleId: number | null = null;
  loading: boolean = false;
  storeLoading: boolean = false;

  authUser: AppUser | null = null;
  appUsers: AppUser[] = [];
  courses: Course[] = [];
  courseMaterials: CourseMaterial[] = [];
  ratings: Rating[] = [];

  authUserSub: Subscription | null = null;
  appUsersSub: Subscription | null = null;
  coursesSub: Subscription | null = null;
  courseMaterialsSub: Subscription | null = null;
  ratingsSub: Subscription | null = null;
  loadingSub: Subscription | null = null;
  searchSub: Subscription | null = null;

  cardPropsArr: cardProps[] = [];
  myCardPropsArr: cardProps[] = [];
  disCardPropsArr: cardProps[] = [];
  myCardPropsArrFiltered: cardProps[] = [];
  disCardPropsArrFiltered: cardProps[] = [];

  buildingCardProps: boolean = false;
  searchTerm: string = '';

  bannerURL: string = '../../../assets/images/banner2.jpg';

  constructor(
    private appUserService: AppUserService,
    private authService: AuthService,
    private storeService: StoreService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.generateBannerImg();
    console.log('cardPropsArr.length=', this.cardPropsArr.length);
    this.subscribeStore();
    // if (this.courses.length !== 0) {
    this.buildCardProps();
    // }
    this.userId = this.authService.getJwtId();
    this.userRoleId = this.authService.getJwtUserRoleId();
    this.loadUser();
  }

  subscribeStore(): void {
    console.log('subscribeStore');
    console.log('this.appUsers.length=', this.appUsers.length);
    this.authUser = this.storeService.authUser;
    this.authUserSub = this.storeService.authUserSubject.subscribe({
      next: (v) => {
        this.authUser = v;
      },
    });
    this.appUsers = this.storeService.appUsers;
    this.appUsersSub = this.storeService.appUsersSubject.subscribe({
      next: (v) => {
        this.appUsers = v;
        this.buildCardProps();
      },
    });
    this.courses = this.storeService.courses;
    this.coursesSub = this.storeService.coursesSubject.subscribe({
      next: (v) => {
        this.courses = v;
        this.buildCardProps();
      },
    });
    this.courseMaterials = this.storeService.courseMaterials;
    this.courseMaterialsSub = this.storeService.courseMaterialsSubject.subscribe(
      {
        next: (v) => {
          this.courseMaterials = v;
        },
      }
    );
    this.ratings = this.storeService.ratings;
    this.ratingsSub = this.storeService.ratingsSubject.subscribe({
      next: (v) => {
        this.ratings = v;
        this.buildCardProps();
      },
    });
    this.storeLoading = this.storeService.loading;
    this.loadingSub = this.storeService.loadingSubject.subscribe({
      next: (v) => {
        this.storeLoading = v;
      },
    });
    this.searchTerm = this.storeService.searchTerm;
    this.searchSub = this.storeService.searchSubject.subscribe({
      next: (v) => {
        this.searchTerm = v;
        this.search();
      },
    });
    console.log('after this.appUsers.length=', this.appUsers.length);
  }

  unSubscribeStore() {
    console.log('unSubscribeStore');
    this.authUserSub?.unsubscribe();
    this.appUsersSub?.unsubscribe();
    this.coursesSub?.unsubscribe();
    this.courseMaterialsSub?.unsubscribe();
    this.ratingsSub?.unsubscribe();
    this.loadingSub?.unsubscribe();
  }

  ngOnDestroy() {
    this.unSubscribeStore();
  }

  async loadUser(): Promise<void> {
    this.userId = this.authService.getJwtId();
    if (!this.userId) {
      return;
    }
    this.loading = true;
    try {
      const user = await this.appUserService.getAppUserById(this.userId);
      this.storeService.authUserSubject.next(user);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  async updateUser(): Promise<void> {
    let token: string | null = this.authService.getToken();
    if (!this.authUser || !token) {
      return;
    }
    this.loading = true;
    try {
      this.authUser = await this.appUserService.updateAppUser(
        this.authUser,
        token
      );
    } catch (err) {
      console.log(err);
    } finally {
      this.loading = false;
    }
  }

  buildCardProps() {
    // if (this.buildingCardProps) {
    //   return;
    // }
    console.log('dashboard - building card props');
    // this.buildingCardProps = true;
    let cardPropsArr: cardProps[] = [];
    // Create the props for passing into cards.
    this.courses.forEach((course) => {
      let instructor =
        this.appUsers.find((u) => u.id === course.instructorId) || null;
      let ratings = this.ratings.filter((r) => r.courseId === course.id);
      let sumOfRatings = ratings.reduce((a, b) => a + b.stars, 0);
      let courseTotalRating = ratings.length;
      let courseRating = sumOfRatings / courseTotalRating || 0;
      cardPropsArr.push({
        course,
        instructor,
        courseRating,
        courseTotalRating,
        authUser: this.authUser,
      });
    });
    this.cardPropsArr = cardPropsArr;

    // Filter user courses.
    console.log('this.authUser=', this.authUser);
    this.myCardPropsArr = this.cardPropsArr.filter((p) => {
      if (this.authUser?.userRoleId === 1) {
        return this.authUser.instructorCourses.find(
          (c) => c.id === p.course?.id
        );
      }
      if (this.authUser?.userRoleId === 2) {
        return this.authUser.studentCourses.find((c) => c.id === p.course?.id);
      }
      return false;
    });
    console.log('myCardProps=', this.myCardPropsArr);
    // Filter for everything else.
    this.disCardPropsArr = this.cardPropsArr.filter((p) => {
      return !this.myCardPropsArr.find((m) => m.course?.id === p.course?.id);
    });
    this.myCardPropsArrFiltered = this.myCardPropsArr;
    this.disCardPropsArrFiltered = this.disCardPropsArr;
    console.log('disCardProps=', this.disCardPropsArr);
    console.log('cardPropsArr=', this.cardPropsArr);
    // this.buildingCardProps = false;
  }

  search(): void {
    console.log('dashboard search=', this.searchTerm);
    if (!this.searchTerm) {
      this.myCardPropsArrFiltered = this.myCardPropsArr;
      this.disCardPropsArrFiltered = this.disCardPropsArr;
      return;
    }
    const regexp = new RegExp(this.searchTerm, 'i');
    this.myCardPropsArrFiltered = this.myCardPropsArr.filter((p) => {
      if (p.course) {
        let found = p.course.courseMaterials.find((m) =>
          regexp.test(m.description)
        );
        if (found) {
          return true;
        }
      }
      return (
        regexp.test(p.instructor?.fName || '') ||
        regexp.test(p.instructor?.lName || '') ||
        regexp.test(p.instructor?.email || '') ||
        regexp.test(p.course?.name || '') ||
        regexp.test(p.course?.description || '')
      );
    });
    this.disCardPropsArrFiltered = this.disCardPropsArr.filter((p) => {
      if (p.course) {
        let found = p.course.courseMaterials.find((m) =>
          regexp.test(m.description)
        );
        if (found) {
          return true;
        }
      }
      return (
        regexp.test(p.instructor?.fName || '') ||
        regexp.test(p.instructor?.lName || '') ||
        regexp.test(p.instructor?.email || '') ||
        regexp.test(p.course?.name || '') ||
        regexp.test(p.course?.description || '')
      );
    });
  }

  generateBannerImg(): void {
    const randInt = this.sharedService.genRandomInt(1, 4);
    this.bannerURL = `../../../assets/images/banner${randInt}.jpg`;
  }
}
