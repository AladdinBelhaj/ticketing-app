import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
})
export class AddprojectComponent implements OnInit{

  clients: string[] = []; // array to store list of clients
  employes: string[] = []; // array to store list of clients

  ngOnInit(): void {
    // fetch list of clients from back end
    this.projectService.getClientList().subscribe(
      (clients) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );

    this.projectService.getEmployeList().subscribe(
      (employes) => {
        this.employes = employes;
      },
      (error) =>{
        console.error('Error fetching employes:', error);
      }
    )
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
    // http request sucessfull
    console.log('Project saved successfully!');
  },
  (error) => {
    // error
    console.error('Error saving project:', error);
  }
);}

}
