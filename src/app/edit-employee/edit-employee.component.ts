import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatSelectModule, MatRadioModule, MatListModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  constructor(private dataService: DataService, private snackBar: MatSnackBar) {};

  @Input() people: any;
  @Output() onUpdate = new EventEmitter<string>();
  departments = ["Assessing", "Building", "Clerk", "Code", "Engineering", "Environmental",
  "Facilities", "Finance", "Fire", "HR", "Inspection", "IT", "PDS", "Planning", "Police",
  "Purchasing", "Records", "Supervisor", "Treasurer", "Water", "Water Billing"];
  searchAdmin: string = '';

  // ngOnInit() {
  //   console.log("INIT -> PEOPLE", this.people);
  // }

  async saveChanges(person: any) {
    const updatedEmployee = {
      fname: person.fname,
      lname: person.lname,
      department: person.department,
      telephone: person.telephone,
      email: person.email,
    }

    this.dataService.updateEmployee(updatedEmployee, person.id).then(async => {
      this.onUpdate.emit();
      person.edit = !person.edit;
    }).catch(error => {
      console.error(error);
      this.snackBar.open('Error - unable to update!', 'Close', {
        duration: 6000,
      });
    })
  }

  deleteEmployee(person: any) {
    if (window.confirm("Are you sure you'd like to delete employee " + person.fname + " " + person.lname + "?")) {
      this.dataService.deleteEmployee(person).then(() => {
        this.onUpdate.emit();
      }).catch(error => {
        console.error(error);
        this.snackBar.open('Error - unable to delete!', 'Close', {
          duration: 6000,
        });
      })
    }
  }
}
