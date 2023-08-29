import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/model/project';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProjectService } from 'src/app/service/project.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  public Project!: Project[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['title', 'number', 'type', 'Opérations'];

  swalConfig: SweetAlertOptions = {
    title: 'Confirmation',
    text: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler',
    customClass: {
      confirmButton: 'btn btn-success margin-5',
      cancelButton: 'btn btn-secondary margin-5',
    },
    buttonsStyling: false,
  };

  constructor(private ProjectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.ProjectService.getAllProjects().subscribe((response: any) => {
      this.Project = response;
      this.dataSource = new MatTableDataSource(this.Project);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    this.dataSource = new MatTableDataSource(this.Project);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeProject(projectId: number | undefined) {
    if (projectId) {
      this.ProjectService.deleteProject(projectId).subscribe(() => {
        this.ProjectService.getAllProjects().subscribe(
          (Projects: Project[]) => {
            this.Project = Projects;
            this.dataSource = new MatTableDataSource(this.Project);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        );
      });
    }
  }
}
