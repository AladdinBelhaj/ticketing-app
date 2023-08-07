export interface Ticket {
  projet: string;
  objet: string;
  emitteur: string;
  description: string;
  fichier?: FormData;
  etat: string;
  responsable?: string;
  descriptionSolution?: string;
  fichierSolution?: string;
}
