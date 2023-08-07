import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Project } from 'src/app/model/project';
import { Ticket } from 'src/app/model/ticket';
import { ProjectService } from 'src/app/service/project.service';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css'],
})
export class AddticketComponent implements OnInit {
  listProjet: Project[] = [];

  listObjet = [
    { id: 1, name: 'Objet1' },
    { id: 2, name: 'Objet2' },
    { id: 3, name: 'Objet3' },
  ];
  emitteur: string = 'email';

  addTicketForm: FormGroup;

  file!: FormData;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private ticketService: TicketService,
    private projectService: ProjectService
  ) {
    this.addTicketForm = this.formBuilder.group({
      projet: new FormControl('', Validators.compose([Validators.required])),
      objet: new FormControl('', Validators.compose([Validators.required])),
      emitteur: new FormControl('', Validators.compose([Validators.required])),
      description: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      fichier: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.emitteur = localStorage.getItem('email')!;
    this.addTicketForm.patchValue({ emitteur: this.emitteur });
    this.addTicketForm.controls['emitteur'].disable();

    this.projectService.getAllProjects().subscribe((projects) => {
      this.listProjet = projects;
    });
  }

  saveTicket() {
    let ticket: Ticket = {
      description: this.addTicketForm.value.description,
      emitteur: this.addTicketForm.value.emitteur,
      objet: this.addTicketForm.value.objet,
      projet: this.addTicketForm.value.projet,
      etat: 'en attente',
      fichier: this.file,
    };

    this.ticketService.saveTicket(ticket).subscribe();
  }

  covertFile() {
    let fileInput = this.addTicketForm.value.fichier;
    if (fileInput?.files && fileInput.files.length > 0) {
      const imageBlob = fileInput.files[0];
      const file = new FormData();
      file.set('file', imageBlob);
      return file;
    } else {
      console.error('No image selected.');
      return null;
    }
  }
  onFileChange(fileInput: HTMLInputElement) {
    if (fileInput?.files && fileInput.files.length > 0) {
      const imageBlob = fileInput.files[0];
      const file = new FormData();
      file.set('file', imageBlob);
      this.file = file;
    } else {
      console.error('No image selected.');
    }
  }

  /*   onFileUpload(fileInput: HTMLInputElement) {
    if (fileInput?.files && fileInput.files.length > 0) {
      const imageBlob = fileInput.files[0];
      const file = new FormData();
      file.set('file', imageBlob);
      this.ticketService.uploadfile(file).subscribe((res) => {
        console.log(res);
      });
    } else {
      console.error('No image selected.');
    }
    //posting information
    if (this.addTicketForm.get('projet')) {
      const ticketData = {
        projet: this.addTicketForm.get('projet')?.value,
        objet: this.addTicketForm.get('objet')?.value,
        emetteur: this.addTicketForm.get('emetteur')?.value,
        description: this.addTicketForm.get('description')?.value,
      };

      this.http.post('your_backend_api_url', ticketData).subscribe(
        (response) => {
          console.log('Ticket added successfully:', response);
          // You can perform additional actions here after a successful post.
        },
        (error) => {
          console.error('Error adding ticket:', error);
          // Handle error cases here.
        }
      );
    } else {
      console.error('Form control "projet" not found.');
    }
  } */
}
