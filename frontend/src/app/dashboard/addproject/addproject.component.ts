import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {FloatLabelType} from '@angular/material/form-field';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
})
export class AddprojectComponent implements OnInit{
 // hideRequiredControl = new FormControl(false);
 // floatLabelControl = new FormControl('auto' as FloatLabelType);
 // options = this._formBuilder.group({
  //  hideRequired: this.hideRequiredControl,
  //  floatLabel: this.floatLabelControl,
 // });
 // constructor(private _formBuilder: FormBuilder) {}

//  getFloatLabelValue(): FloatLabelType {
//    return this.floatLabelControl.value || 'auto';
 // }


  ngOnInit(): void {
    
  }


title: string = '';
number: number = 0;
client:string = '';
type:string = '';
responsable: string = '';
altResponsable : string = '';

private project: Project = {title:'',number:0,client:'',type:'',responsable:'',altResponsable:''};
constructor(private projectService: ProjectService) {}

saveProject() {
  
  this.project.title = this.title;
  this.project.number = this.number;
  this.project.client = this.client;
  this.project.type = this.type;
  this.project.responsable = this.responsable;
  this.project.altResponsable = this.altResponsable;

  this.projectService.saveProject(this.project).subscribe(  () => {
    // This block executes when the HTTP request is successful
    console.log('Project saved successfully!');
    // Optionally, you can perform any other actions or display a success message here.
  },
  (error) => {
    // This block executes if there's an error during the HTTP request
    console.error('Error saving project:', error);
    // Optionally, you can display an error message to the user or handle the error in any other way.
  }
);}

}
