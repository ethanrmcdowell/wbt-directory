import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AuthService } from '../auth.service';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatSelectModule, MatRadioModule, MatListModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  constructor(private authService: AuthService) {};

  @Output() onLogout = new EventEmitter<string>();
  @Input() people: any;
  @Input() departments: any;

  currentTab: string = "edit";
  peopleArray: any = [];

  ngOnInit() {
    this.people.forEach((person: any) => {
      let updatePerson = { ...person, "edit": false };
      this.peopleArray.push(updatePerson);
    })

    console.log("updated array ->", this.peopleArray);
  }

  logoutUser() {
    this.authService.logOutUser((response) => {
      this.onLogout.emit('all');
    });
  }

  saveChanges(person: any) {
    console.log("updated employee ->", person);
    person.edit = !person.edit;
  }
}
