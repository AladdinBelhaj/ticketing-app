import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Project } from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  saveProject(project: Project) {
    return this.http.post<any>('http://localhost:3000/project', project).pipe(
      tap((response) => {
        console.log('Data inserted successfully!'); // Log success message
      }),
      catchError((error) => {
        console.error('Project save error:', error);
        return []; // Return an empty array to handle errors gracefully in the component
      })
    );
  }
}
