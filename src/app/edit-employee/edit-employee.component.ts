import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatSelectModule, MatRadioModule, MatListModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  constructor(private firestore: Firestore) {};

  @Input() people: any;
  @Output() onUpdate = new EventEmitter<string>();
  departments = ["Assessing", "Building", "Clerk", "Code", "Engineering", "Environmental",
  "Facilities", "Finance", "Fire", "HR", "Inspection", "IT", "PDS", "Planning", "Police",
  "Purchasing", "Records", "Supervisor", "Treasurer", "Water", "Water Billing"];

  ngOnInit() {
    console.log("people ->", this.people);
  }

  saveChanges(person: any) {
    console.log("updated employee ->", person);
    person.edit = !person.edit;

    this.onAdminUpdate();
  }

  deleteEmployee(person: any) {
    if (window.confirm("Are you sure you'd like to delete employee " + person.fname + " " + person.lname + "?")) {
      const docInstance = doc(this.firestore, 'directory', person.id);
      deleteDoc(docInstance).then(() => {
        console.log('deleted');
        this.onAdminUpdate();
      }).catch((error) => {
        console.error(error);
      });
    }
  }

  onAdminUpdate() {
    this.onUpdate.emit();
  }
}
