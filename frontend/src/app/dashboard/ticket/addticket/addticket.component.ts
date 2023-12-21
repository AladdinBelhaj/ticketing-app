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
import { DateFormatPipe } from 'src/app/date-format.pipe';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { NotifService } from 'src/app/service/notif.service';
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
  fileSolutionName = 'Sélectionner un fichier solution';

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private objectService: ObjectService,
    private userService: UserService,
    private notifService: NotifService
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
      fichierSolution: new FormControl(''),
      etat: new FormControl('En Attente', Validators.compose([])),
      responsable: new FormControl(
        '',
        Validators.compose([])
      ),
      descriptionSolution: new FormControl(
        '',
        Validators.compose([])
      ),
      dateEmission: [new Date()],
    });
  }
  ngOnDestroy(): void {
    this.ticketService.addTicketForm = this.addTicketForm;
  }



  clients: string[] = []; // array to store list of clients
  employes: string[] = []; // array to store list of clients

  ngOnInit(): void {

    this.fetchUsers();

    

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
    this.addTicketForm.patchValue({ fichierSolution: null });
  }



  fetchUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.clients = users
        .filter((user) => user.Role === 'Client')
        .map((user) => `${user.Nom} ${user.Prenom}`);
        
      this.employes = users
        .filter((user) => user.Role === 'Employer')
        .map((user) => `${user.Nom} ${user.Prenom}`);
    });
  }



  saveTicket() {
    const formData = new FormData();

    formData.append('description', this.addTicketForm.value.description);
    formData.append('emitteur', this.addTicketForm.value.emitteur);
    formData.append('objet', this.addTicketForm.value.objet);
    formData.append('projet', this.addTicketForm.value.projet);
    formData.append('etat', this.addTicketForm.value.etat);
    formData.append('responsable', this.addTicketForm.value.responsable);
    formData.append(
      'descriptionSolution',
      this.addTicketForm.value.descriptionSolution
    );

    const fileInputSolution = this.addTicketForm.get('fichierSolution');
    if (fileInputSolution?.value) {
      formData.append('fichierSolution', fileInputSolution.value);
    }

    const fileInput = this.addTicketForm.get('fichier');
    if (fileInput?.value) {
      formData.append('fichier', fileInput.value);
    }

    this.ticketService.saveTicket(formData).subscribe(
      (response) => {
        console.log('Ticket added successfully:', response);
        this.ticketService.addTicketForm = undefined;
    
        const notificationData = {
          notifText: 'A new ticket has been added.',
          sentTo: "admin@gmail.com",
        };
    
        this.notifService.createNotification(notificationData).subscribe(() => {
          console.log('Notification sent successfully');
        });
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
  onFileSolutionChange(fileSolutionInput: HTMLInputElement) {
    if (fileSolutionInput?.files && fileSolutionInput.files.length > 0) {
      const file = fileSolutionInput.files[0];
      this.fileSolutionName = file.name;
      this.addTicketForm.patchValue({ fichierSolution: file });
    } else {
      console.error('No file selected for solution.');
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
    this.fileSolutionName = 'Sélectionner un fichier solution';
    this.addTicketForm.patchValue({ emitteur: this.emitteur });
  }
}
