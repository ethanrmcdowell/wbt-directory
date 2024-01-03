import { Component, Input } from '@angular/core';
import { PersonListComponent } from "../person-list/person-list.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-all-employees',
    standalone: true,
    templateUrl: './all-employees.component.html',
    styleUrl: './all-employees.component.css',
    imports: [PersonListComponent, CommonModule]
})
export class AllEmployeesComponent {
  @Input() searchText: string = '';
  @Input() people: any;
  @Input() isMobile: any;

  ngOnInit() {
    console.log("isMobile: " + this.isMobile);
  }
}
