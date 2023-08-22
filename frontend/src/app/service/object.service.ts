import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Object } from 'src/app/model/object'; // Make sure you import the correct Object type

@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  constructor(private http: HttpClient) {}

  // Change the return type to Object[] instead of object[]
  getAllObjects(): Observable<Object[]> {
    return this.http.get<Object[]>('http://localhost:3000/objet');
  }
}
