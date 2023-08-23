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
  saveObject(formData: FormData) {
    return this.http.post(this.apiUrl + '/objet', formData);
  }
  getAllObjects(): Observable<Object[]> {
    return this.http.get<Object[]>('http://localhost:3000/objet');
  }
  deleteObject(objectId: number): Observable<any> {
    const url = `${this.apiUrl}/objet/${objectId}`;
    return this.http.delete(url);
  }
}
