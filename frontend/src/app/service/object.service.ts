import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Object } from '../model/object';

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  constructor(private http: HttpClient) {}

  saveProject(object: Object) {
    return this.http.post<any>('http://localhost:3000/object', object).pipe(
      tap((response) => {
        console.log('Data inserted successfully!')
      }),
      catchError((error) => {
        console.error('Project save error:', error);
        return [];
      })
    );
  }

}