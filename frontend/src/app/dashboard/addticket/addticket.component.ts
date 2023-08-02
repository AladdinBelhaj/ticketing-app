import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css'],
})
export class AddticketComponent implements OnInit {
  listProjet = [
    { id: 1, name: 'Projet1' },
    { id: 2, name: 'Projet2' },
    { id: 3, name: 'Projet3' },
  ];

  listObjet = [
    { id: 1, name: 'Objet1' },
    { id: 2, name: 'Objet2' },
    { id: 3, name: 'Objet3' },
  ];
  emitteur: string = 'email';

  addTicketForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private ticketService: TicketService
  ) {
    this.addTicketForm = this.formBuilder.group({
      projet: new FormControl('', Validators.compose([Validators.required])),
      objet: new FormControl('', Validators.compose([Validators.required])),
      emitteur: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      /* fichier: new FormControl('', Validators.compose([Validators.required])), */
    });
  }

  ngOnInit(): void {
    this.emitteur = localStorage.getItem('email')!;
    this.addTicketForm.patchValue({ emitteur: this.emitteur });
    this.addTicketForm.controls['emitteur'].disable();
  }
  onFileUpload(fileInput: HTMLInputElement) {
    if (fileInput?.files && fileInput.files.length > 0) {
      const imageBlob = fileInput.files[0];
      const file = new FormData();
      file.set('file', imageBlob);
      this.ticketService.uploadfile(file).subscribe((res) => {
        console.log(res);
      });
      // this.http
      //   .post('http://localhost:4000/upload', file)
      //   .subscribe((response: any) => {
      //     console.log(response);
      //   });
    } else {
      console.error('No image selected.');
    }
  }
}
