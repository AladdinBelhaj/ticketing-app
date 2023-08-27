import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, tap } from 'rxjs';
import { Object } from 'src/app/model/object'; // Make sure you import the correct Object type

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  AddObjectForm: FormGroup | undefined = undefined;
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000';
  // Change the return type to Object[] instead of object[]
  saveObject(object: Object) {
    return this.http.post(this.apiUrl + '/objet', object);
  }
  getAllObjects(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/objet`);
  }
  deleteObject(objectId: number): Observable<any> {
    const url = `${this.apiUrl}/objet/${objectId}`;
    return this.http.delete(url);
  }
  public getObjectById(id: any): Observable<Object> {
    return this.http.get<Object>(`${this.apiUrl}/objet/getbyid/${id}`);
  }
  public getObjectsByUser(title: string): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/objet/${title}`);
  }
  public updateObject(id: string, object: Object): Observable<any> {
    return this.http.put(`${this.apiUrl}/objet/${id}`, object);
  }
}
