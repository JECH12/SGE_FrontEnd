export interface Employee {
  id: number;
  fullName: string;
  hireDate: string;
  salary: number;
  departmentId: number;
  departmentName: string;
  positionId: number;
  positionName: string;
}

export interface CreateEmployee {
  fullName: string;
  hireDate: string;
  salary: number;
  departmentId: number;
  positionId: number;
}

export interface UpdateEmployee extends CreateEmployee {}