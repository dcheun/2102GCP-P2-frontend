import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user';
import { Course } from 'src/app/models/course';
import { AppUserService } from 'src/app/services/app-user.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {

  course:Course|undefined = undefined;
  appUser:AppUser|null = null;
  courseId:number = 0;
  loading:boolean = true;
  courseName:string|undefined="";
  instructorId:number=0;
  instructorfName:string="";
  instructorlName:string="";
  description:string|undefined="";



  constructor(
    private courseService: CourseService,
    private appUserService: AppUserService,
    private acRoute: ActivatedRoute,
    private router: Router
  ) {
    this.instructorId = this.acRoute.snapshot.params.id;
    this.courseId = this.acRoute.snapshot.params.id2;
   }


  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    this.loading =true;

      this.appUser = await this.appUserService.getAppUserById(this.instructorId);    
      this.course = this.appUser.instructorCourses.find(x => x.id == this.courseId)
      this.courseName = this.course?.name;
      this.instructorfName = this.appUser.fName
      this.instructorlName = this.appUser.lName
      this.description = this.course?.description
      console.log(this.course)
     
     
      // this.course = await this.courseService.getCourseById(this.courseId);
      // this.courseName = this.course.name

      // console.log(this.course)
      // console.log(this.courseId)
     // console.log(this.appUser.instructorCourses);
    //  console.log(this.instructorCourses.find(x => x.id == this.courseId))
     


   
  }

}
