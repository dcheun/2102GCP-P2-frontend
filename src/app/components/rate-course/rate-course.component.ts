import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.css']
})
export class RateCourseComponent implements OnInit {

  isRate:boolean[]=[false,false,false,false,false]

  @Input()rate:number=0;
  @Output()rateChange = new EventEmitter<number>();

  isRated1:boolean=this.isRate[0]
  isRated2:boolean=this.isRate[1]
  isRated3:boolean=this.isRate[2]
  isRated4:boolean=this.isRate[3]
  isRated5:boolean=this.isRate[4]
  constructor() { }

  ngOnInit(): void {
  }

  changerate(ratenum:number){
    for (let i=0;i<ratenum;i++) {

      this.isRate[i]=true
      
    }
    for(let j=(this.isRate.length)-(this.isRate.length-ratenum);j<this.isRate.length;j++){
       this.isRate[j]=false
    }
    this.isRated1=this.isRate[0]
    this.isRated2=this.isRate[1]
    this.isRated3=this.isRate[2]
    this.isRated4=this.isRate[3]
    this.isRated5=this.isRate[4]
    this.rate=ratenum;
    this.rateChange.emit(this.rate)
   
 }

}
