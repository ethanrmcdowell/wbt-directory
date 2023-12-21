import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-department-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './department-employees.component.html',
  styleUrl: './department-employees.component.css'
})
export class DepartmentEmployeesComponent {
  @Input() searchText: string = '';
}
