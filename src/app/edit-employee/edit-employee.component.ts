import { Component, Input } from '@angular/core';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatSelectModule, MatRadioModule, MatListModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  @Input() people: any;
  departments = ["Assessing", "Building", "Clerk", "Code", "Engineering", "Environmental",
  "Facilities", "Finance", "Fire", "HR", "Inspection", "IT", "PDS", "Planning", "Police",
  "Purchasing", "Records", "Supervisor", "Treasurer", "Water", "Water Billing"];

  ngOnInit() {
    console.log("people ->", this.people);
  }

  saveChanges(person: any) {
    console.log("updated employee ->", person);
    person.edit = !person.edit;
  }
}
