import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/service/ticket.service';
import { Ticket } from 'src/app/model/ticket';
import { Object } from 'src/app/model/object';
import { Project } from 'src/app/model/project';
import { ObjectService } from 'src/app/service/object.service';
import { ProjectService } from 'src/app/service/project.service';
import { NotifService } from 'src/app/service/notif.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';
@Component({
  selector: 'app-answer-ticket',
  templateUrl: './answer-ticket.component.html',
  styleUrls: ['./answer-ticket.component.css']
})
export class AnswerTicketComponent {
  public ticket!: Ticket;
  public ticketid = '';

  listProjet: Project[] = [];

  listObjet: Object[] = [];

  swap = "";
  employes: string[] = [];

  empEmails: User[] = []; // array to store list of clients
  empEmail = "";
  emitteur: string = 'email';

  updateTicketForm: FormGroup;

  fileName = 'Sélectioner une fichier';
  fileSolutionName = 'Sélectionner un fichier solution';
  navigateToticketService() {
    this.router.navigate(['/ticket-list']); // Adjust the route as needed
  }

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private projectService: ProjectService,
    private objectService: ObjectService,
    private router: Router,
    private route: ActivatedRoute,
    private notifService: NotifService,
    private userService: UserService
  ) {
    this.updateTicketForm = this.formBuilder.group({
      projet: new FormControl('', Validators.compose([])),
      objet: new FormControl('', Validators.compose([])),
      emitteur: new FormControl('', Validators.compose([])),
      description: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      fichier: new FormControl(''),
      fichierSolution: new FormControl(''),
      etat: new FormControl('', Validators.compose([])),
      responsable: new FormControl('', Validators.compose([])),
      altResponsable: new FormControl('', Validators.compose([])),

      descriptionSolution: new FormControl('', Validators.compose([])),
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigate(['/dashboard/ticket']);
      } else {
        this.ticketid = '' + paramMap.get('id');

        this.projectService.getAllProjects().subscribe((projects) => {
          this.listProjet = projects;
        });
        this.objectService.getAllObjects().subscribe((objects) => {
          this.listObjet = objects;
        });

        this.ticketService
          .getTicketById(this.ticketid)
          .subscribe((response: Ticket) => {
            this.ticket = response;
            this.updateTicketForm.setValue({
              projet: this.ticket.projet,
              objet: this.ticket.objet,
              description: this.ticket.description,
              emitteur: this.ticket.emitteur,
              fichier: null,
              fichierSolution: null,
              etat: this.ticket.etat,
              responsable: this.ticket.responsable,
              altResponsable: this.ticket.altResponsable,
              descriptionSolution: this.ticket.descriptionSolution,
            });
          });
      }
    });
  }

  public editTicket() {
    if (this.updateTicketForm.valid) {
      const editedTicket: Ticket = {
        projet: this.updateTicketForm.value.projet,
        objet: this.updateTicketForm.value.objet,
        emitteur: this.updateTicketForm.value.emitteur,
        description: this.updateTicketForm.value.description,
        altResponsable: this.updateTicketForm.value.altResponsable,
        etat: 'Terminé',
        responsable: this.updateTicketForm.value.responsable,
        descriptionSolution: this.updateTicketForm.value.descriptionSolution,
        dateEmission: this.updateTicketForm.value.dateEmission,
      };

      this.ticketService
        .updateTicket(this.ticketid, editedTicket)
        .subscribe(() => {
          
          const notificationData = {
            notifText: 'Votre ticket a reçu une réponse',
            sentTo: editedTicket.emitteur, 
          };
  
          this.notifService.createNotification(notificationData).subscribe(() => {
            console.log('Notification sent successfully');
          });
          this.router.navigate(['/dashboard/ticket']);
        });
    }
  }




  public delegateTicket() {
    
    if (this.updateTicketForm.valid) {
      const tempAltResponsable = this.updateTicketForm.value.altResponsable;
      const tempResponsable = this.updateTicketForm.value.responsable;

      console.log(tempAltResponsable);
      console.log(this.updateTicketForm.value.altResponsable);
      const editedTicket: Ticket = {
        projet: this.updateTicketForm.value.projet,
        objet: this.updateTicketForm.value.objet,
        emitteur: this.updateTicketForm.value.emitteur,
        description: this.updateTicketForm.value.description,
        etat: 'En Cours',
        responsable: tempAltResponsable,
        altResponsable: tempResponsable,
        descriptionSolution: this.updateTicketForm.value.descriptionSolution,
        dateEmission: this.updateTicketForm.value.dateEmission,
      };


      this.ticketService
        .updateTicket(this.ticketid, editedTicket)
        .subscribe(() => {
          
          this.router.navigate(['/dashboard/ticket']);
        });
        this.userService.getAllUsers().subscribe((users) => {
        
          this.empEmails = users
          .filter((user) => user.Role == "Employer" && `${user.Nom} ${user.Prenom}` == editedTicket.responsable);
          this.empEmail = this.empEmails[0].email;
        });
        this.ticketService
        .updateTicket(this.ticketid, editedTicket)
        .subscribe(() => {
    


          const resNotificationData = {
            notifText: 'Vous avez reçu un nouveau ticket',
            sentTo: this.empEmail,

          };
  
          this.notifService.createNotification(resNotificationData).subscribe(() => {
            console.log('Notification sent successfully');
            console.log(this.empEmail);
    
          });

          this.router.navigate(['/dashboard/ticket']);
        });
    }
  }

  onFileChange(fileInput: HTMLInputElement) {
    if (fileInput?.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.fileName = file.name;
      this.updateTicketForm.patchValue({ fichier: file });
    } else {
      console.error('No file selected.');
    }
  }
  onFileSolutionChange(fileSolutionInput: HTMLInputElement) {
    if (fileSolutionInput?.files && fileSolutionInput.files.length > 0) {
      const file = fileSolutionInput.files[0];
      this.fileSolutionName = file.name;
      this.updateTicketForm.patchValue({ fichierSolution: file });
    } else {
      console.error('No file selected for solution.');
    }
  }
  covertFile() {
    let fileInput = this.updateTicketForm.value.fichier;
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
  //just added
  resetForm() {
    this.updateTicketForm.reset();
    this.fileName = 'Sélectioner une fichier';
    this.fileSolutionName = 'Sélectionner un fichier solution';
    this.updateTicketForm.patchValue({ emitteur: this.emitteur });
  }



}
