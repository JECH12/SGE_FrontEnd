import { Routes } from '@angular/router';
import { createEmployeeResolver } from '../core/resolvers/create-employee.resolver';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },

  {
    path: 'employees',
    loadComponent: () =>
      import('./features/employees/pages/employees-list/employees-list.component')
        .then(c => c.EmployeesListComponent)
  },

  {
    path: 'employees/create',
    loadComponent: () =>
      import('./features/employees/pages/create-employee/create-employee.component')
        .then(c => c.CreateEmployeeComponent),
        resolve: {
            data: createEmployeeResolver
        }
  },

  {
    path: 'employees/edit/:id',
    loadComponent: () =>
      import('./features/employees/pages/edit-employee/edit-employee.component')
        .then(c => c.EmployeesEditComponent)
  }
];
