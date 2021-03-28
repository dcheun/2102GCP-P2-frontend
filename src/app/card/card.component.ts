import { Course } from './../models/course';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()course:Course|null=null;
  courseRating:number=3.4
  courseTotalRating:number=7
  constructor() { }

  ngOnInit(): void {
  }

}
