import { CourseMaterialService } from '../services/course-material.service';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Course } from '../models/course';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
})
export class AddmaterialComponent implements OnInit {
  //set this courseId value from returned course once you create the course
  //that course id will be used to create course material
  courseId: number = 0;
  courseName: string = '';
  //imported ViewChild, this.courseForm.reset(), resets the form input value
  //@ViewChild("courseForm") courseForm:any
  @ViewChild('materialForm') materialForm: any;
  //display add course material form, when add course is clicked, will turn true
  //it will add a class matformdisplay in css, will will change display from none to block
  displayMaterial = false;
  displayCourse = true;
  displayMaterialList = false;
  courseMaterial: any[] = [];

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private courseMaterialService: CourseMaterialService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {}

  async addCourse(values: any) {
    const token = this.authService.getToken();
    if (!token) {
      return;
    }
    //values from input in the form of object
    if (!values.name || !values.description) {
      alert('Input value error');
    } else {
      //added instructor id to the values from input
      values.instructorId = this.authService.getJwtId();
      values.courseId = 0;
      console.log(values);
      const course: Course = await this.courseService.createCourse(
        values,
        token
      );
      console.log(course);
      this.courseName = course.name;
      this.courseId = course.id;

      // Notify store of changes.
      const courses = this.storeService.courses;
      const updatedCourses = [...courses, course];
      this.storeService.coursesSubject.next(updatedCourses);
      const authUser = this.storeService.authUser;
      authUser?.instructorCourses.push(course);
      this.storeService.authUserSubject.next(authUser || undefined);
    }

    //courseId=course.courseId;
    //this.courseForm.reset()
    this.displayCourse = false;
    this.displayMaterial = true;
  }

  async addCourseMaterial(values: any) {
    const token = this.authService.getToken();
    if (!token) {
      return;
    }
    if (!values.description || !values.materialType) {
      alert('Input value error');
    } else {
      const courseMaterials = {
        materialType: values.materialType,
        description: values.description,
      };
      this.courseMaterial.push(courseMaterials);
      values.courseId = this.courseId;
      values.id = 0;
      console.log(values);
      const courseMaterial = await this.courseMaterialService.createCourseMaterial(
        values,
        token
      );
      console.log(courseMaterial);
      const courseById = await this.courseService.getCourseById(this.courseId);
      console.log(courseById.courseMaterials);

      this.materialForm.reset();
      this.displayMaterialList = true;
      alert('Material was added');
    }
  }
}
