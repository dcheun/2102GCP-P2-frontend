import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user';
import { Course } from 'src/app/models/course';
import { AppUserService } from 'src/app/services/app-user.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.css']
})
export class MaterialTableComponent implements OnInit {
  
  ratingInputNumber:number = 0;

  pdfSource:any|undefined;
  file:string =""
  v:string="getVideo";
  p:string="getPdf"

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

  async videoFile(){
    this.file = this.v;
  }
  async pdFile(){
    this.pdfSource = 'https://wtf.tw/ref/robbins.pdf';
    this.file = this.p
  
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
     
   
  }
}
