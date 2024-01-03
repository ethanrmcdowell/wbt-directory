import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListComponent } from "../person-list/person-list.component";

@Component({
    selector: 'app-department-employees',
    standalone: true,
    templateUrl: './department-employees.component.html',
    styleUrl: './department-employees.component.css',
    imports: [CommonModule, PersonListComponent]
})
export class DepartmentEmployeesComponent {
  @Input() searchText: string = '';
  @Input() byDepartments: any;
  @Input() isMobile: any;

  ngOnInit() {
    console.log("isMobile: " + this.isMobile);
  }
}
