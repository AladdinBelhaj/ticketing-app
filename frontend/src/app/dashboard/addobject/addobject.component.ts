import { Component, OnInit } from '@angular/core';
import { Object } from 'src/app/model/object';
import { ObjectService } from 'src/app/service/object.service';

@Component({
  selector: 'app-addobject',
  templateUrl: './addobject.component.html',
  styleUrls: ['./addobject.component.css']
})
export class AddobjectComponent implements OnInit{

  ngOnInit(): void {
    
  } 

  title: string = '';
classType: string = '';

private object: Object = {title:'',classType:''};
constructor(private objectService: ObjectService) {}

saveObject() {
  
  this.object.title = this.title;
  this.object.classType = this.classType;


  this.objectService.saveProject(this.object).subscribe(  () => {
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

