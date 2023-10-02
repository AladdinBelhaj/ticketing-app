import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';
@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.css'],
})
export class UpdateProjectComponent implements OnInit {
  public project!: Project;
  public projectid = '';
  title: string = '';
  number: number = 0;
  client: string = '';
  type: string = '';
  responsable: string = '';
  altResponsable: string = '';
  UpdateProjectForm: FormGroup;
  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.UpdateProjectForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      number: new FormControl('', Validators.compose([Validators.required])),
      client: new FormControl('', Validators.compose([Validators.required])),
      type: new FormControl('', Validators.compose([Validators.required])),
      responsable: new FormControl(''),
      altResponsable: new FormControl(''),
    });
  }
  clients: string[] = []; // array to store list of clients
  employes: string[] = []; // array to store list of clients
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigate(['/dashboard/projet']);
      } else {
        this.projectid = '' + paramMap.get('id');
        this.projectService.getProjectById(paramMap.get('id')).subscribe(
          (response: Project) => {
            this.project = response;
            this.UpdateProjectForm.setValue({
              title: this.project.title,
              number: this.project.number,
              client: this.project.client,
              type: this.project.type,
              responsable: this.project.responsable,
              altResponsable: this.project.altResponsable,
            });
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
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
        (error) => {
          console.error('Error fetching employes:', error);
        }
      );
    });
  }
  public editProject() {
    if (this.UpdateProjectForm.valid) {
      const editedProject: Project = {
        title: this.UpdateProjectForm.value.title,
        number: this.UpdateProjectForm.value.number,
        client: this.UpdateProjectForm.value.client,
        type: this.UpdateProjectForm.value.type,
        responsable: this.UpdateProjectForm.value.responsable,
        altResponsable: this.UpdateProjectForm.value.altResponsable,
      };

      this.projectService
        .updateProject(this.projectid, editedProject)
        .subscribe(() => {
          this.router.navigate(['/dashboard/projet']);
        });
    }
  }
  resetForm() {
    this.UpdateProjectForm.reset();
  }
}
