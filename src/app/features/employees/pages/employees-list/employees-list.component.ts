import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../../../../core/services/employees.service';
import { Employee} from '../../../../../core/models/employee.model';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './employees-list.component.html'
})
export class EmployeesListComponent implements OnInit {
  
  employees: Employee[] = [];
  loading = true;
  error: string | null = null;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.loading = true;

    this.employeesService.getAll().subscribe({
      next: (res) => {
        if (res.success) {
          this.employees = res.data ?? [];
        } else {
          this.error = res.message ?? 'Unexpected error';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Error connecting to API';
        this.loading = false;
      }
    });
  }

  delete(id: number) {
  Swal.fire({
    title: '¿Eliminar empleado?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {

    if (result.isConfirmed) {

      this.employeesService.delete(id).subscribe({

        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El empleado ha sido eliminado.',
            timer: 1500,
            showConfirmButton: false
          });

          this.getEmployees(); // recargar tabla
        },

        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el empleado.'
          });
        }

      });

    }

  });
}
}