import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Object } from 'src/app/model/object';
import { ObjectService } from 'src/app/service/object.service';

@Component({
  selector: 'app-update-object',
  templateUrl: './update-object.component.html',
  styleUrls: ['./update-object.component.css'],
})
export class UpdateObjectComponent implements OnInit {
  public object!: Object;
  public objectid = '';
  title: string = '';
  classType: string = '';
  UpdateObjectForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private ObjectService: ObjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.UpdateObjectForm = this.formBuilder.group({
      title: new FormControl('', Validators.compose([Validators.required])),
      classType: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigate(['/dashboard/objet']);
      } else {
        this.objectid = '' + paramMap.get('id');
        this.ObjectService.getObjectById(paramMap.get('id')).subscribe(
          (response: Object) => {
            this.object = response;
            this.UpdateObjectForm.setValue({
              title: this.object.title,
              classType: this.object.classType,
            });
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  }
  public editObject() {
    if (this.UpdateObjectForm.valid) {
      const editedObject: Object = {
        title: this.UpdateObjectForm.value.title,
        classType: this.UpdateObjectForm.value.classType,
      };

      this.ObjectService.updateObject(this.objectid, editedObject).subscribe(
        () => {
          this.router.navigate(['/dashboard/objet']);
        }
      );
    }
  }
  resetForm() {
    this.UpdateObjectForm.reset();
  }
}
