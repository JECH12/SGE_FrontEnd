import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpBaseService } from './http-base.service';
import { environment } from '../../enviroments/enviroment';
import { Position } from '../models/position.model';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class PositionsService {
  private apiUrl = `${environment.apiUrl}/positions`;

  constructor(private httpBase: HttpBaseService) {}

  getAll(): Observable<Result<Position[]>> {
    return this.httpBase.get<Position[]>(this.apiUrl);
  }

  getById(id: number): Observable<Result<Position>> {
    return this.httpBase.get<Position>(`${this.apiUrl}/${id}`);
  }
}
