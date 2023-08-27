import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Project } from '../model/project';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  addProjectForm: FormGroup | undefined = undefined;
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  saveProject(project: Project) {
    return this.http.post(this.apiUrl + '/projet', project);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:3000/projet');
  }
  public getProjectById(id: any): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projet/getbyid/${id}`);
  }
  public updateProject(id: string, project: Project): Observable<any> {
    return this.http.put(`${this.apiUrl}/projet/${id}`, project);
  }
  deleteProject(projectId: number): Observable<any> {
    const url = `${this.apiUrl}/projet/${projectId}`;
    return this.http.delete(url);
  }
}
