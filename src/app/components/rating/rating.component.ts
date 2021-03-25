import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating:number=0;
  @Input() totalRating:number=0;
  
  isRate1:boolean[]=[false,false,false,false,false];
  
  isRated1:boolean=this.isRate1[0]
  isRated2:boolean=this.isRate1[1]
  isRated3:boolean=this.isRate1[2]
  isRated4:boolean=this.isRate1[3]
  isRated5:boolean=this.isRate1[4]
  
  constructor() {}

  ngOnInit(): void {
    this.fixedRating(this.rating); 

    
  }

 fixedRating(num:number){
  num=Math.round(num);
  for(let i=0;i<num;i++){
    this.isRate1[i]=true;
  }
  this.isRated1=this.isRate1[0]
  this.isRated2=this.isRate1[1]
  this.isRated3=this.isRate1[2]
  this.isRated4=this.isRate1[3]
  this.isRated5=this.isRate1[4]
 }
 
}