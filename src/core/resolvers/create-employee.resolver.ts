import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DepartmentsService } from '../services/departments.service';
import { PositionsService } from '../services/positions.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export const createEmployeeResolver: ResolveFn<any> = () => {
  const deptService = inject(DepartmentsService);
  const posService = inject(PositionsService);

  return forkJoin({
    departments: deptService.getAll(),
    positions: posService.getAll()
  }).pipe(
    map(result => ({
      departments: result.departments.data,
      positions: result.positions.data
    }))
  );
};