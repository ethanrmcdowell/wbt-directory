import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { people } from '../assets/fakePeople';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatDividerModule, MatBadgeModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wbt-directory';
  people: any = people;
  fullPeople: any = people;
  searchText: string = "";

  ngOnInit() {
    people.forEach((person: any) => {
      let areaCode = person.telephone.substring(0,3);
      let middleDigits = person.telephone.substring(3,6);
      let endDigits = person.telephone.substring(6);

      person.telephone = "(" + areaCode + ") " + middleDigits + "-" + endDigits;
    })

    people.sort((a: any, b: any) => a.lname.localeCompare(b.lname));
  }

  searchPeople(event: any) {
    console.log("SEARCH TEXT: " + this.searchText);

    let match = this.people.filter((person: any) => {
      person.lname.toLowerCase().includes(this.searchText.toLowerCase()) || person.fname.toLowerCase().includes(this.searchText.toLowerCase());
    })

    console.log(match);
  }
}
