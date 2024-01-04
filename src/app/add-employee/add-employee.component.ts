import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';

import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  constructor(private firestore: Firestore, private snackBar: MatSnackBar) {};

  @Output() onUpdate = new EventEmitter<string>();

  newEmployeeForm = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    department: new FormControl('', [Validators.required])
  });

  departments = ["Assessing", "Building", "Clerk", "Code", "Engineering", "Environmental",
  "Facilities", "Finance", "Fire", "HR", "Inspection", "IT", "PDS", "Planning", "Police",
  "Purchasing", "Records", "Supervisor", "Treasurer", "Water", "Water Billing"];

  addEmployee() {
    const collectionInstance = collection(this.firestore, 'directory');
    addDoc(collectionInstance, this.newEmployeeForm.value).then(() => {
      this.onUpdate.emit();
    }).catch(error => {
      this.snackBar.open('Error!', 'Close', {
        duration: 6000,
      });
    });
  }
}
