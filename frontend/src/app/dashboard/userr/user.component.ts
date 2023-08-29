import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/model/user';
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
import { UserService } from 'src/app/service/user.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  public user!: User[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['Nom', 'Prenom', 'Role', 'Opérations'];

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
  constructor(private UserService: UserService, private router: Router) {}
  ngOnInit() {
    this.UserService.getAllUsers().subscribe((response: any) => {
      this.user = response;
      this.dataSource = new MatTableDataSource(this.user);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter($event: any) {}
  removeUser(userId: number | undefined) {
    if (userId) {
      this.UserService.deleteUser(userId).subscribe(() => {
        this.UserService.getAllUsers().subscribe((Users: User[]) => {
          this.user = Users;
          this.dataSource = new MatTableDataSource(this.user);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
    }
  }
}
