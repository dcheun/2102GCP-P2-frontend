import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { StoreService } from 'src/app/services/store.service';
import { Course } from '../../models/course';

interface inputProps {
  [index: string]: any;
  course: Course | null;
  instructor: AppUser | null;
  courseRating: number;
  courseTotalRating: number;
  authUser: AppUser | null;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() props: inputProps = {
    course: null,
    instructor: null,
    courseRating: 0,
    courseTotalRating: 0,
    authUser: null,
  };
  authUser: AppUser | null = null;
  userId: number | null = null;
  userRoleId: number | null = null;
  imgURL: string = '';
  btnMode: string = '';

  constructor(
    private sharedService: SharedService,
    private authService: AuthService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.generateCourseImg();
    if (!this.authService.getToken()) {
      this.btnMode = 'view';
      return;
    }
    const {
      id: jwtId,
      userRoleId: jwtRoleId,
    } = this.authService.getDecodeJWT() || { id: null, userRoleId: null };
    const { course, instructor, authUser } = this.props;
    if (!instructor || !course) {
      return;
    }
    // Check if instructor is logged in and this is their course.
    if (jwtId === instructor.id) {
      const found = instructor.instructorCourses.find(
        (c) => c.id === course.id
      );
      if (found) {
        this.btnMode = 'edit';
        return;
      }
    }
    // Check if student is logged in and this is their course.
    if (jwtId === authUser?.id && authUser?.userRoleId === 2) {
      const found = authUser.studentCourses.find((c) => c.id === course.id);
      if (found) {
        this.btnMode = 'start';
        return;
      }
    }
    this.btnMode = 'view';
  }

  generateCourseImg(): void {
    const randInt = this.sharedService.genRandomInt(1, 18);
    this.imgURL = `../../../assets/images/course${randInt}.jpg`;
  }
}
