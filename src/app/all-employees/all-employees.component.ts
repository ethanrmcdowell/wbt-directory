import { Component, Input } from '@angular/core';
import { PersonListComponent } from "../person-list/person-list.component";
import { CommonModule } from '@angular/common';
import { Person } from '../models';

@Component({
    selector: 'app-all-employees',
    standalone: true,
    templateUrl: './all-employees.component.html',
    styleUrl: './all-employees.component.css',
    imports: [PersonListComponent, CommonModule]
})
export class AllEmployeesComponent {
  @Input() searchText: string = '';
  @Input() people: Person[] = [];
  @Input() isMobile: any;

  ngOnInit() {
  }
}
