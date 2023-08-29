import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  public user!: User;
  public userid = '';
  Nom: string = '';
  Prenom: string = '';
  NumTelephone: number = 0;
  Role: string = '';
  UpdateUserForm: FormGroup;
  constructor(
    private UserService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.UpdateUserForm = this.formBuilder.group({
      Nom: new FormControl('', Validators.compose([Validators.required])),
      Prenom: new FormControl('', Validators.compose([Validators.required])),
      NumTelephone: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      Role: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigate(['/dashboard/user']);
      } else {
        this.userid = '' + paramMap.get('id');
        this.UserService.getUserById(paramMap.get('id')).subscribe(
          (response: User) => {
            this.user = response;
            this.UpdateUserForm.setValue({
              Nom: this.user.Nom,
              Prenom: this.user.Prenom,
              client: this.user.NumTelephone,
              Role: this.user.Role,
            });
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  }
  public editUser() {
    if (this.UpdateUserForm.valid) {
      const editeduser: User = {
        Nom: this.UpdateUserForm.value.Nom,
        Prenom: this.UpdateUserForm.value.Prenom,
        NumTelephone: this.UpdateUserForm.value.NumTelephone,
        Role: this.UpdateUserForm.value.Role,
        email: '',
        password: '',
      };

      this.UserService.updateUser(this.userid, editeduser).subscribe(() => {
        this.router.navigate(['/dashboard/user']);
      });
    }
  }
  resetForm() {
    this.UpdateUserForm.reset();
  }
}
