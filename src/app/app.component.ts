import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { people } from '../assets/fakePeople';
import data from '../assets/people.json';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PersonListComponent } from "./person-list/person-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, MatToolbarModule, MatListModule, MatDividerModule, MatBadgeModule, MatInputModule, MatFormFieldModule, FormsModule, PersonListComponent]
})
export class AppComponent {
  title = 'wbt-directory';
  people: any = data.users;
  fullPeople: any = data.users;
  searchText: string = "";

  ngOnInit() {
    this.people.forEach((person: any) => {
      let areaCode = person.telephone.substring(0,3);
      let middleDigits = person.telephone.substring(3,6);
      let endDigits = person.telephone.substring(6);

      person.telephone = "(" + areaCode + ") " + middleDigits + "-" + endDigits;
    })

    this.people.sort((a: any, b: any) => a.lname.localeCompare(b.lname));
  }
}
