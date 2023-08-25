import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Object } from 'src/app/model/object';
import { ObjectService } from 'src/app/service/object.service';

@Component({
  selector: 'app-info-object',
  templateUrl: './info-object.component.html',
  styleUrls: ['./info-object.component.css'],
})
export class InfoObjectComponent implements OnInit {
  public ObjectsList!: Object[];

  public ObjectId = '';
  object!: Object;
  constructor(
    private ObjectService: ObjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigate(['/dashboard/ticket']);
      } else {
        this.ObjectId = '' + paramMap.get('id');
        this.ObjectService.getObjectById(paramMap.get('id')).subscribe(
          (response: Object) => {
            this.object = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  }
}
