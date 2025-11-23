import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../../../../core/services/employees.service';
import { DepartmentsService } from '../../../../../core/services/departments.service';
import { PositionsService } from '../../../../../core/services/positions.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employees-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, RouterModule],
  templateUrl: './edit-employee.component.html'
})
export class EmployeesEditComponent implements OnInit {

  id!: number;
  loading = false;
  errorMessage = '';
  departments: any[] = [];
  positions: any[] = [];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService,
    private departmentsService: DepartmentsService,
    private positionsService: PositionsService
  ) {
      this.form = this.fb.nonNullable.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      hireDate: ['', Validators.required],
      salary: [0, Validators.required],
      departmentId: [0, Validators.required],
      positionId: [0, Validators.required],
  });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.departmentsService.getAll().subscribe(res => this.departments = res.data || []);
    this.positionsService.getAll().subscribe(res => this.positions = res.data || []);

    this.employeesService.getById(this.id).subscribe({
      next: (res) => {
        if (res.data) {
          this.form.patchValue({
            fullName: res.data.fullName,
            hireDate: res.data.hireDate.substring(0, 10),
            salary: res.data.salary,
            departmentId: res.data.departmentId,
            positionId: res.data.positionId
          });
        }
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la información';
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.employeesService.update(this.id, this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.errorMessage = 'Error al actualizar el empleado';
        this.loading = false;
      }
    });
  }
}
