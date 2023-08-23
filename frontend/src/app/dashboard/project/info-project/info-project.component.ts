import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/model/project';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-info-project',
  templateUrl: './info-project.component.html',
  styleUrls: ['./info-project.component.css'],
})
export class InfoProjectComponent implements OnInit {
  public projectsList!: Project[];

  public projectId = '';
  project!: Project;
  constructor(
    private ProjectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigate(['/dashboard/ticket']);
      } else {
        this.projectId = '' + paramMap.get('id');
        this.ProjectService.getProjectById(paramMap.get('id')).subscribe(
          (response: Project) => {
            this.project = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  }
}
