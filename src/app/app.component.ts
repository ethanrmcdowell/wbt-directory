import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { people } from '../assets/fakePeople';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatListModule, MatDividerModule, MatBadgeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'wbt-directory';
  people = people;

  ngOnInit() {
    people.forEach((person: any) => {
      let areaCode = person.telephone.substring(0,3);
      let middleDigits = person.telephone.substring(3,6);
      let endDigits = person.telephone.substring(6);

      person.telephone = "(" + areaCode + ") " + middleDigits + "-" + endDigits;
    })
  }
}
