import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Object } from 'src/app/model/object';
import { ObjectService } from 'src/app/service/object.service';
@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css'],
})
export class AddObjectComponent implements OnInit, OnDestroy {
  title: string = '';
  classType: string = '';
  AddObjectForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private ObjectService: ObjectService
  ) {
    this.AddObjectForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      classType: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  ngOnDestroy(): void {
    this.ObjectService.AddObjectForm = this.AddObjectForm;
  }
  ngOnInit(): void {
    if (this.ObjectService.AddObjectForm != undefined) {
      this.AddObjectForm = this.ObjectService.AddObjectForm;
    }
  }
  saveObject() {
    console.log(this.AddObjectForm.value);
    let object: Object = {
      title: this.AddObjectForm.value.title,
      classType: this.AddObjectForm.value.classType,
    };

    this.ObjectService.saveObject(object).subscribe(
      (response) => {
        this.ObjectService.AddObjectForm = undefined;
      },
      (error) => {
        console.error('Error adding object:', error);
      }
    );
    console.log('FormData before sending:', object);
  }
  resetForm() {
    this.AddObjectForm.reset();
  }
}
