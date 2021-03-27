import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../models/course';
import { AppUserService } from '../services/app-user.service';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()course:Course|null = null;

  courseName:string = "Course Name"
  @Input()courseRating:number=3.4
  @Input()courseTotalRating:number=7
  @Input()instructorName:string=""; 

  instructorId

  constructor(
    private courseService: CourseService,
    private appUserService: AppUserService,
    private acRoute: ActivatedRoute,
    private router: Router
  ) {
    this.instructorId = this.acRoute.snapshot.params.id;
    // this.courseId = this.acRoute.snapshot.params.id2;
   }


  ngOnInit(): void {
  }

}
