import { Component, OnInit, ViewChild } from '@angular/core';
import { Object } from 'src/app/model/object';
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
import { ObjectService } from 'src/app/service/object.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css'],
})
export class ObjectComponent implements OnInit {
  public Object!: Object[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['title', 'classType', 'Opérations'];

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

  constructor(private ObjectService: ObjectService, private router: Router) {}
  ngOnInit() {
    this.ObjectService.getAllObjects().subscribe((response: any) => {
      this.Object = response;
      this.dataSource = new MatTableDataSource(this.Object);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter($event: any) {}

  removeObject(objectId: number | undefined) {
    if (objectId) {
      this.ObjectService.deleteObject(objectId).subscribe(() => {
        this.ObjectService.getAllObjects().subscribe((Objects: Object[]) => {
          this.Object = Objects;
          this.dataSource = new MatTableDataSource(this.Object);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    }
  }
}
