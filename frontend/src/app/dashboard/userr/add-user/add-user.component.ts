import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit, OnDestroy {
  Nom: string = '';
  Prenom: string = '';
  NumTelephone: number = 0;
  Role: string = '';
  PURE_EMAIL_REGEXP =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  password: string = '';
  show = false;
  AddUserForm: FormGroup;
  constructor(
    private UserService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.AddUserForm = this.formBuilder.group({
      Nom: new FormControl('', Validators.compose([Validators.required])),
      Prenom: new FormControl('', Validators.compose([Validators.required])),
      NumTelephone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9]{8}'),
        ])
      ),
      Role: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(this.PURE_EMAIL_REGEXP),
        ])
      ),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  ngOnDestroy(): void {
    this.UserService.AddUserForm = this.AddUserForm;
  }
  ngOnInit(): void {
    if (this.UserService.AddUserForm != undefined) {
      this.AddUserForm = this.UserService.AddUserForm;
    }
  }
  onClick() {
    // Toggle password visibility
    this.show = !this.show;
  }
  saveUser() {
    console.log(
      'Form values before FormData preparation:',
      this.AddUserForm.value
    );
    let user: User = {
      Nom: this.AddUserForm.value.Nom,
      Prenom: this.AddUserForm.value.Prenom,
      NumTelephone: this.AddUserForm.value.NumTelephone,
      Role: this.AddUserForm.value.Role,
      email: this.AddUserForm.value.email,
      password: this.AddUserForm.value.password,
    };

    this.UserService.saveUser(user).subscribe(
      (response) => {
        this.UserService.AddUserForm = undefined;
      },
      (error) => {
        console.error('Error adding user:', error);
      }
    );
    console.log('FormData before sending:', user);
        }
  }

  


  resetForm() {
    this.AddUserForm.reset();
  }
}
