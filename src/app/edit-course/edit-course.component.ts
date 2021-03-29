import { CourseMaterialService } from './../services/course-material.service';
import { AuthService } from './../services/auth.service';
import { CourseService } from './../services/course.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseMaterial } from '../models/course-material';
import { Course } from '../models/course';
import { supportsPassiveEventListeners } from '@angular/cdk/platform';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
   
  courseId:number=0
  materialIdToBeUpdated=0
  courseMaterials:any[]=[]
  // courseMaterials=[{id:1,materialType:"video",description:"a introduction video",instructorId:2},
  //                   {id:2,materialType:"video",description:"advance spring boot video",instructorId:2}]
  displayUpdateMaterialForm=false
  displayAddMaterialForm=false;

  @ViewChild("updateMaterialForm") updateMaterialForm:any
  @ViewChild ("addMaterialForm") addMaterialForm:any
  constructor(private courseService: CourseService,
    private authService:AuthService,
    private actRoute:ActivatedRoute,
    private courseMaterialService:CourseMaterialService) {
       this.courseId =parseInt(this.actRoute.snapshot.params.id);
     
   }

  ngOnInit(): void {
    this.getCourseMaterials()
  }
  async getCourseMaterials(){
    const course = await this.courseService.getCourseById(this.courseId);
    let sortedCourseMaterials = course.courseMaterials.sort((a,b)=>a.id>b.id?1:-1)
    this.courseMaterials = sortedCourseMaterials;
  }
  
  async deleteMaterial(materialId:number){
    const token = this.authService.getToken();
     if(!token){
       return;
     }
    const deleted:boolean = await this.courseMaterialService.deleteCourseMaterialById(materialId,token);
    const course:Course =await this.courseService.getCourseById(this.courseId)
    console.log(materialId)
    console.log("deleted: "+deleted)
    console.log(course)
    this.getCourseMaterials()
  }
  displayUpdateForm(materialId:number){
    this.materialIdToBeUpdated=materialId;
    this.displayUpdateMaterialForm=true;
    this.displayAddMaterialForm=false
    // const courseMaterial:CourseMaterial = await this.courseMaterialService.getCourseMaterialById(materialId)
    // const material:CourseMaterial=await this.courseMaterialService.updateCourseMaterial(courseMaterial,this.authService.getToken())
    // this.getCourseMaterials()
  }

  displayAddForm(){
    this.displayAddMaterialForm=true;
    this.displayUpdateMaterialForm=false;
  }
  async updateCourseMaterial(values:any){
    const token = this.authService.getToken();
     if(!token){
       return;
     }
    if(!values.description ||!values.materialType){
      alert("Input value error")
    }
    else{
    values.courseId=this.courseId;
    values.id=this.materialIdToBeUpdated
    
    const updatedCourse:CourseMaterial = await this.courseMaterialService.updateCourseMaterial(values,token)
   
    this.updateMaterialForm.reset();
    this.displayUpdateMaterialForm=false
    this.getCourseMaterials();
    
    }
  }
  async addCourseMaterial(values:any){
    const token = this.authService.getToken();
     if(!token){
       return;
     }
    if(!values.description ||!values.materialType){
      alert("Input value error")
    }
    else{
    values.courseId = this.courseId
    values.id=0;
    const courseMaterial:CourseMaterial= await this.courseMaterialService.createCourseMaterial(values,token)
    console.log(courseMaterial)
    this.addMaterialForm.reset()
    this.displayAddMaterialForm=false;
    this.getCourseMaterials()
    }
  }

}
