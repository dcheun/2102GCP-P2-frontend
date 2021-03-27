import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ɵSafeHtml } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppUser } from 'src/app/models/app-user';
import { Course } from 'src/app/models/course';
import { Rating } from 'src/app/models/rating';
import { AppUserService } from 'src/app/services/app-user.service';
import { CourseService } from 'src/app/services/course.service';
import { RatingService } from 'src/app/services/rating.service';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  courses:Course[] = [];
  appUsers:AppUser[] =[];
  ratings:Rating [] = [];
  carouselTemplate:string = ``;
  carouselInner = document.getElementById("carouselId")
  safeTemplate: SafeHtml|null = null;



  constructor(
    private courseService: CourseService,
    private appUserService: AppUserService,
    private ratingService: RatingService,
    private sanitizer: DomSanitizer,
  ) { 

  }
  

  ngOnInit(): void {
      this.loadData()
  }

  async loadData(){
    this.courses = await this.courseService.getAllCourses();
    this.ratings = await this.ratingService.getAllRatings();
    console.log(this.ratings)

    this.genCarouselTemplate()
   if(this.carouselInner != null) {
       this.safeTemplate = this.sanitizer.bypassSecurityTrustHtml(this.carouselTemplate);
     }
    console.log(this.carouselTemplate)
    console.log(this.safeTemplate);
  }

  genCarouselTemplate(){


    for(let i = 0; i < this.courses.length ; i+=3){
      
      this.carouselTemplate += `
      <div class="carousel-item ${i===0?'active':''}>
      <div > 
        <div class="row" style="padding-left: 200px;">
        `
        for(let j = i; j < this.courses.length && j < i+3; j++)
        this.carouselTemplate += 
        `
          <div class="column"  >
              <app-card [course]="courses[${j}]" ></app-card>
          </div>
         `
          this.carouselTemplate += `
        </div>
    </div>
    </div>`
    

    }
  }


}
