import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../../../../core/services/employees.service';
import { DepartmentsService } from '../../../../../core/services/departments.service';
import { PositionsService } from '../../../../../core/services/positions.service';
import { Department } from '../../../../../core/models/department.model';
import { Position } from '../../../../../core/models/position.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateEmployee } from '../../../../../core/models/employee.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-employee.component.html'
})
export class CreateEmployeeComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private employeesService = inject(EmployeesService);
  private departmentsService = inject(DepartmentsService);
  private positionsService = inject(PositionsService);
  private router = inject(Router);

  departments: Department[] = [];
  positions: Position[] = [];

  loading = false;
  errorMessage = '';

  form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    hireDate: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(1)]],
    departmentId: [null, Validators.required],
    positionId: [null, Validators.required],
  });

  ngOnInit(): void {
    const resolved = this.route.snapshot.data['data'];
    this.departments = resolved.departments;
    this.positions = resolved.positions;
  }

  loadDepartments() {
    this.departmentsService.getAll().subscribe(res => {
      if (res.success) this.departments = res.data!;
    });
  }

  loadPositions() {
    this.positionsService.getAll().subscribe(res => {
      if (res.success) this.positions = res.data!;
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const payload: CreateEmployee = {
      fullName: this.form.value.fullName!,
      hireDate: this.form.value.hireDate!,
      salary: Number(this.form.value.salary!),
      departmentId: Number(this.form.value.departmentId!),
      positionId: Number(this.form.value.positionId!)
    };


    this.employeesService.create(payload).subscribe({
      next: res => {
        this.loading = false;
        if (res.success) {
          this.router.navigate(['/employees']);
        } else {
          this.errorMessage = res.message ?? 'Error inesperado';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Error al crear empleado.';
      }
    });
  }
}
