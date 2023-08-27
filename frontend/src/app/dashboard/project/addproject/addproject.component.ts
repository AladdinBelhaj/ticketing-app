import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css'],
})
export class AddprojectComponent implements OnInit, OnDestroy {
  title: string = '';
  number: number = 0;
  client: string = '';
  type: string = '';
  responsable: string = '';
  altResponsable: string = '';
  addProjectForm: FormGroup;
  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder
  ) {
    this.addProjectForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      number: new FormControl('', Validators.compose([Validators.required])),
      client: new FormControl('', Validators.compose([Validators.required])),
      type: new FormControl('', Validators.compose([Validators.required])),
      responsable: new FormControl(''),
      altResponsable: new FormControl(''),
    });
  }
  ngOnDestroy(): void {
    this.projectService.addProjectForm = this.addProjectForm;
  }
  ngOnInit(): void {
    if (this.projectService.addProjectForm != undefined) {
      this.addProjectForm = this.projectService.addProjectForm;
    }
  }
  saveProject() {
    console.log(
      'Form values before FormData preparation:',
      this.addProjectForm.value
    );
    let project: Project = {
      title: this.addProjectForm.value.title,
      number: this.addProjectForm.value.number,
      client: this.addProjectForm.value.client,
      type: this.addProjectForm.value.type,
      responsable: this.addProjectForm.value.responsable,
      altResponsable: this.addProjectForm.value.altResponsable,
    };

    this.projectService.saveProject(project).subscribe(
      (response) => {
        this.projectService.addProjectForm = undefined;
      },
      (error) => {
        console.error('Error adding projet:', error);
      }
    );
    console.log('FormData before sending:', project);
  }
  resetForm() {
    this.addProjectForm.reset();
  }
}
