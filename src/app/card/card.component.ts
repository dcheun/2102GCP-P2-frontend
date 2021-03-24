import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  courseRating:number=3.4
  courseTotalRating:number=7
  constructor() { }

  ngOnInit(): void {
  }

}
