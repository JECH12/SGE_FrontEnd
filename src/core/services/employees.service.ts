import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { environment } from '../../enviroments/enviroment';
import { Employee, CreateEmployee, UpdateEmployee } from '../models/employee.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private apiUrl = `${environment.apiUrl}/employees`;

  constructor(private httpBase: HttpBaseService) {}

  getAll(): Observable<Result<Employee[]>> {
    return this.httpBase.get<Employee[]>(this.apiUrl);
  }

  getById(id: number): Observable<Result<Employee>> {
    return this.httpBase.get<Employee>(`${this.apiUrl}/${id}`);
  }

  create(dto: CreateEmployee): Observable<Result<Employee>> {
    return this.httpBase.post<Employee>(this.apiUrl, dto);
  }

  update(id: number, dto: UpdateEmployee): Observable<Result<Employee>> {
    return this.httpBase.put<Employee>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<Result<boolean>> {
    return this.httpBase.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}