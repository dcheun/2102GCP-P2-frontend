import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user';
import { Course } from 'src/app/models/course';
import { Rating } from 'src/app/models/rating';
import { AppUserService } from 'src/app/services/app-user.service';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { RatingService } from 'src/app/services/rating.service';

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

  checkRated:string="";
  alreadyRated:string="rated";
  notRated:string="notrated";
  rateComment:string="";
  rateNumber:number=0;

  course:Course|undefined = undefined;
  ratings:Rating|undefined = undefined;
  ratingsArr:Rating[]|null = null;

  // rating1:|null = null;

  appUserStudent:AppUser|null = null;
  appUserInstructor:AppUser|null = null;

  courseId:number = 0;
  loading:boolean = true;
  courseName:string|undefined="";
  instructorId:number=0;
  studentId:number=0;
  instructorfName:string|undefined="";
  instructorlName:string="";
  description:string|undefined="";



 
  constructor(
    private courseService: CourseService,
    private appUserService: AppUserService,
    private acRoute: ActivatedRoute,
    private router: Router,
    private ratingService: RatingService,
    private authService:AuthService
  ) {
    this.studentId = this.acRoute.snapshot.params.id;
    this.courseId = this.acRoute.snapshot.params.id2;
   }



  ngOnInit(): void {
    this.loadData();
  }

  async videoFile(){
    this.file = this.v;
  }
  async pdFile(){
    this.pdfSource = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
    this.file = this.p
  
  } 

  async loadData(){
      
      this.appUserStudent = await this.appUserService.getAppUserById(this.studentId);
      console.log(this.appUserStudent)

      this.course = this.appUserStudent.studentCourses.find(x => x.id == this.courseId)
      console.log(this.course)
    
      this.ratingsArr = await this.ratingService.getAllRatings()
      console.log(this.ratingsArr)
      
      // this.courseRating = this.ratingsArr.find(x => x.courseId == this.courseId)

      // console.log(this.courseRating)
      this.ratings = this.ratingsArr.find(x => x.userId == this.studentId)

       
      
      console.log(this.ratings)
    

      let ratBool = false;

      if(!this.ratings||!this.course){
        return
      }
      console.log(this.ratings)
        
      for(let ratings of this.ratingsArr){
      // if(this.course.id == this.ratings.courseId) {
        if((ratings.courseId == this.course.id) && (ratings.userId == this.studentId)){
        this.ratingInputNumber = ratings.stars
        this.rateComment = ratings.comment
        console.log(this.ratingInputNumber)
        console.log(this.rateComment)
        console.log(this.appUserStudent.id)
        console.log(this.ratings.userId)
        ratBool = true;
      }else{
      console.log("didnt");
      }
    }
       

      if(this.course != undefined){
        this.instructorId = this.course.instructorId;
      }
        this.appUserInstructor = await this.appUserService.getAppUserById(this.instructorId);  
        this.courseName = this.course?.name;
        this.instructorfName = this.appUserInstructor.fName
        this.instructorlName = this.appUserInstructor.lName
        this.description = this.course?.description

      if(ratBool == true){
        this.ratedDisplay()
      }else{
        this.notRatedDisplay()
      }

  }

  ratedDisplay(){
    this.checkRated = this.alreadyRated
  }
  notRatedDisplay(){
    this.checkRated = this.notRated 
  }

  async createRating(){
    const token = this.authService.getToken()
    const userId = this.authService.getJwtId();
    if(!token || !userId){
      return
    }
    const rate = new Rating(0,this.ratingInputNumber, this.rateComment,this.courseId, userId);
    await this.ratingService.createRating(rate,token)
    this.callingFunc()
  }
  callingFunc(){
    this.ratedDisplay()
  }
}
