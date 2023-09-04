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
  email: string = '';
  password: string = '';
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
        Validators.compose([Validators.required])
      ),
      emaill: new FormControl('', Validators.compose([Validators.required])),
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
  resetForm() {
    this.AddUserForm.reset();
  }
}
