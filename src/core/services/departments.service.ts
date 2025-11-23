import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { environment } from '../../enviroments/enviroment';
import { Department } from '../models/department.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  private apiUrl = `${environment.apiUrl}/departments`;

  constructor(private httpBase: HttpBaseService) {}

  getAll(): Observable<Result<Department[]>> {
    return this.httpBase.get<Department[]>(this.apiUrl);
  }

  getById(id: number): Observable<Result<Department>> {
    return this.httpBase.get<Department>(`${this.apiUrl}/${id}`);
  }
}
