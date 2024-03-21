import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

import { AuthService } from '../auth.service';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { AddEmployeeComponent } from "../add-employee/add-employee.component";

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { EditFaxComponent } from '../edit-fax/edit-fax.component';
import { AddFaxComponent } from '../add-fax/add-fax.component';

@Component({
    selector: 'app-admin-panel',
    standalone: true,
    templateUrl: './admin-panel.component.html',
    styleUrl: './admin-panel.component.css',
    imports: [FormsModule, MatRadioModule, EditEmployeeComponent, AddEmployeeComponent, EditFaxComponent, AddFaxComponent]
})
export class AdminPanelComponent {
  constructor(private authService: AuthService) {};

  @Output() onLogout = new EventEmitter<string>();
  @Output() onUpdate = new EventEmitter<string>();
  @Input() people: any;
  @Input() faxes: any;

  currentTab: string = "edit";
  peopleArray: any = [];
  faxArray: any = [];

  ngOnInit() {
    this.peopleArray = [];
    this.faxArray = [];
    this.people.forEach((person: any) => {
      let updatePerson = { ...person, "edit": false };
      this.peopleArray.push(updatePerson);
    });

    this.faxes.forEach((fax: any) => {
      let updateFaxes = { ...fax, "edit": false };
      this.faxArray.push(updateFaxes);
    });
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  employeesUpdated() {
    console.log("Employees updated (admin-panel.component.ts)");
    this.onUpdate.emit();
  }

  faxUpdated() {
    console.log("Fax updated (admin-panel.component.ts)");
    this.onUpdate.emit();
  }

  logoutUser() {
    this.authService.logOutUser((response) => {
      this.onLogout.emit('all');
    });
  }
}
