import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { Course } from 'src/app/models/course';

interface cardProps {
  [index: string]: any;
  course: Course | null;
  instructor: AppUser | null;
  courseRating: number;
  courseTotalRating: number;
  authUser: AppUser | null;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  @Input() cardPropsArr: cardProps[] = [];
  @Input() carouselId: number = 0;
  carouselTarget: string = 'carouselTarget';
  carouselBsTarget: string = '#carouselTarget';

  constructor() {}

  ngOnInit(): void {
    this.carouselTarget = `carouselTarget${this.carouselId}`;
    this.carouselBsTarget = `#carouselTarget${this.carouselId}`;
  }
}
