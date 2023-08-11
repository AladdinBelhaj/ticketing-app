import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Project } from '../model/project';
import { Client } from '../model/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  saveProject(project: Project): Observable<any> {
    return this.http.post<any>('http://localhost:3000/project', project).pipe(
      tap((response) => {
        console.log('Data inserted successfully!'); 
      }),
      catchError((error) => {
        console.error('Project save error:', error);
        return []; // incase of error return empty array
      })
    );
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:3000/projet');
  }


  getClientList(): Observable<string[]> {
    return this.http.get<any[]>('http://localhost:3000/client')
  }

  getEmployeList(): Observable<string[]>{
    return this.http.get<any[]>('http://localhost:3000/employe')
  }
  
}
