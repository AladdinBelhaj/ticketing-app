import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Object } from 'src/app/model/object';
import { Project } from 'src/app/model/project';
import { ObjectService } from 'src/app/service/object.service';
import { ProjectService } from 'src/app/service/project.service';
import { TicketService } from 'src/app/service/ticket.service';
@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css'],
})
export class AddticketComponent implements OnInit, OnDestroy {
  listProjet: Project[] = [];

  listObjet: Object[] = [];

  emitteur: string = 'email';

  addTicketForm: FormGroup;

  fileName = 'Sélectioner une fichier';

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private objectService: ObjectService
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
  ngOnDestroy(): void {
    this.ticketService.addTicketForm = this.addTicketForm;
  }

  ngOnInit(): void {
    if (this.ticketService.addTicketForm != undefined) {
      this.addTicketForm = this.ticketService.addTicketForm;
    }
    this.emitteur = localStorage.getItem('email')!;
    this.addTicketForm.patchValue({ emitteur: this.emitteur });

    this.projectService.getAllProjects().subscribe((projects) => {
      this.listProjet = projects;
    });
    this.objectService.getAllObjects().subscribe((objects) => {
      this.listObjet = objects;
    });
  }

  saveTicket() {
    const formData = new FormData();

    formData.append('description', this.addTicketForm.value.description);
    formData.append('emitteur', this.addTicketForm.value.emitteur);
    formData.append('objet', this.addTicketForm.value.objet);
    formData.append('projet', this.addTicketForm.value.projet);
    formData.append('etat', 'en attente');
    formData.append('responsable', this.addTicketForm.value.responsable);
    formData.append(
      'descriptionSolution',
      this.addTicketForm.value.descriptionSolution
    );
    formData.append('fichierSolution', this.addTicketForm.value.responsable);

    const fileInput = this.addTicketForm.get('fichier');
    if (fileInput?.value) {
      formData.append('fichier', fileInput.value);
    }

    this.ticketService.saveTicket(formData).subscribe(
      (response) => {
        console.log('Ticket added successfully:', response);
        this.ticketService.addTicketForm = undefined;
      },
      (error) => {
        console.error('Error adding ticket:', error);
      }
    );
  }

  onFileChange(fileInput: HTMLInputElement) {
    if (fileInput?.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.fileName = file.name;
      this.addTicketForm.patchValue({ fichier: file });
    } else {
      console.error('No file selected.');
    }
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

  resetForm() {
    this.addTicketForm.reset();
    this.fileName = 'Sélectioner une fichier';
    this.addTicketForm.patchValue({ emitteur: this.emitteur });
  }
}
