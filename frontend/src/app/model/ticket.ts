export interface Ticket {
  projet: string;
  objet: string;
  emitteur: string;
  description: string;
  fichier?: File; // Change the type to File
  etat: string;
  responsable: string;
  altResponsable: string;
  descriptionSolution: string;
  dateEmission: string;
  fichierSolution?: string;
  id?: string;
}
