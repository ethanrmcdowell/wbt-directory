import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import data from '../assets/people.json';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';

import { PersonListComponent } from "./person-list/person-list.component";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { DepartmentEmployeesComponent } from "./department-employees/department-employees.component";
import { FaxNumbersComponent } from "./fax-numbers/fax-numbers.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, MatRadioModule, MatToolbarModule, MatListModule, MatDividerModule, MatBadgeModule, MatInputModule, MatFormFieldModule, FormsModule, MatChipsModule, PersonListComponent, AllEmployeesComponent, DepartmentEmployeesComponent, FaxNumbersComponent]
})
export class AppComponent {
  title = 'wbt-directory';
  people: any = data.users;
  fax: any = data.fax;
  searchText: string = "";
  directorySelected: string = "all";
  departments: string[] = ["it", "hr", "police", "fire", "clerk", "treasury"];
  byDepartments: any = {
    it: [],
    police: [],
    fire: [],
    clerk: [],
    treasury: [],
    hr: [],
  };

  ngOnInit() {
    this.formatPhone();
    this.formatFax();
    this.sortArrays();
  }

  formatPhone() {
    this.people.forEach((person: any) => {
      let areaCode = person.telephone.substring(0,3);
      let middleDigits = person.telephone.substring(3,6);
      let endDigits = person.telephone.substring(6);

      person.telephone = "(" + areaCode + ") " + middleDigits + "-" + endDigits;

      this.formatDepartments(person);
    })
  }

  formatFax() {
    this.fax.forEach((faxNum: any) => {
      let areaCode = faxNum.number.substring(0,3);
      let middleDigits = faxNum.number.substring(3,6);
      let endDigits = faxNum.number.substring(6);

      faxNum.number = "(" + areaCode + ") " + middleDigits + "-" + endDigits;
    })

    this.fax.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  formatDepartments(person: any) {
    if (person.department === 'IT') {
      this.byDepartments.it.push(person);
    } else if (person.department === 'HR') {
      this.byDepartments.hr.push(person);
    } else if (person.department === 'Police') {
      this.byDepartments.police.push(person);
    } else if (person.department === 'Fire') {
      this.byDepartments.fire.push(person);
    } else if (person.department === 'Clerk') {
      this.byDepartments.clerk.push(person);
    } else if (person.department === 'Treasury') {
      this.byDepartments.treasury.push(person);
    }
  }

  sortArrays() {
    this.people.sort((a: any, b: any) => a.lname.localeCompare(b.lname));
    this.departments.forEach((dept) => {
      this.byDepartments[dept].sort((a: any, b:any) => a.lname.localeCompare(b.lname));
    });
  }

  changeDirectory(event: any) {
    this.searchText = "";
    this.directorySelected = event.value;
  }
}
