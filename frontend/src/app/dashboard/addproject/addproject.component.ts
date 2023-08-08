import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
})
export class AddprojectComponent implements OnInit{

  clients: string[] = []; // Array to store the list of clients

  ngOnInit(): void {
    // Fetch the list of clients from the backend
    this.projectService.getClientList().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
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
