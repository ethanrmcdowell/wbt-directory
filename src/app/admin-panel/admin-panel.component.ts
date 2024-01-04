import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AuthService } from '../auth.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddEmployeeComponent } from "../add-employee/add-employee.component";

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-panel',
    standalone: true,
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css',
    imports: [FormsModule, MatRadioModule, EditEmployeeComponent, AddEmployeeComponent]
})
export class AdminPanelComponent {
  constructor(private authService: AuthService) {};

  @Output() onLogout = new EventEmitter<string>();
  @Input() people: any;

  currentTab: string = "edit";
  peopleArray: any = [];

  ngOnInit() {
    this.people.forEach((person: any) => {
      let updatePerson = { ...person, "edit": false };
      this.peopleArray.push(updatePerson);
    });
  }

  logoutUser() {
    this.authService.logOutUser((response) => {
      this.onLogout.emit('all');
    });
  }
}
