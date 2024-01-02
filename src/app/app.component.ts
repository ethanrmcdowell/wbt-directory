import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { employeeData } from '../assets/employees';

import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PersonListComponent } from "./person-list/person-list.component";
import { AllEmployeesComponent } from "./all-employees/all-employees.component";
import { DepartmentEmployeesComponent } from "./department-employees/department-employees.component";
import { FaxNumbersComponent } from "./fax-numbers/fax-numbers.component";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, MatDialogModule, MatIconModule, MatRadioModule, MatToolbarModule, MatListModule, MatDividerModule, MatBadgeModule, MatInputModule, MatFormFieldModule, FormsModule, MatChipsModule, PersonListComponent, AllEmployeesComponent, DepartmentEmployeesComponent, FaxNumbersComponent, AdminPanelComponent]
})
export class AppComponent {
  title = 'wbt-directory';
  userAuthenticated: boolean = false;
  people: any = [];
  fax: any = [];
  searchText: string = "";
  directorySelected: string = "all";
  departments: string[] = ["it", "hr", "police", "fire", "clerk", "treasury"];
  showAdmin: boolean = false;
  byDepartments: any = {
    it: [],
    police: [],
    fire: [],
    clerk: [],
    treasury: [],
    hr: [],
  };

  constructor(private firestore: Firestore, public dialog: MatDialog, private authService: AuthService, private snackBar: MatSnackBar) {
    this.authService.userAuthenticated$.subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
  }

  async ngOnInit() {
    this.showAdmin = false;
    this.authService.checkUserStatus();

    // employeeData.forEach(person => {
    //   this.addToFirestore(person);
    // });

    await this.getDirectoryData();
    await this.getFaxData();

    this.sortArrays();
  }

  addToFirestore(person: any) {
    const collectionInstance = collection(this.firestore, 'directory');
    addDoc(collectionInstance, person).then(() => {
      console.log("SUCCESS!");
    }).catch(error => {
      console.error("Error adding to Firestore:", error);
    })
  }

  async getDirectoryData() {
    const q = collection(this.firestore, 'directory');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let data = doc.data();
      const id = doc.id;
      data = { id, ...data };
      this.people.push(data);
    });
    this.formatPhone();
  }

  async getFaxData() {
    const q = collection(this.firestore, 'faxes');
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      let data = doc.data();
      const id = doc.id;
      data = { id, ...data };
      this.fax.push(data);
    });
    this.formatFax();
  }

  formatPhone() {
    this.people.forEach((person: any) => {
      let areaCode = person.telephone.substring(0,3);
      let middleDigits = person.telephone.substring(3,6);
      let endDigits = person.telephone.substring(6);

      person.telephone = "(" + areaCode + ") " + middleDigits + "-" + endDigits;

      this.formatDepartments(person);
    })
    this.people.sort((a: any, b: any) => a.lname.localeCompare(b.lname));
    this.showAdmin = true;
  }

  formatFax() {
    this.fax.forEach((faxNum: any) => {
      let areaCode = faxNum.number.substring(0,3);
      let middleDigits = faxNum.number.substring(3,6);
      let endDigits = faxNum.number.substring(6);

      faxNum.number = "(" + areaCode + ") " + middleDigits + "-" + endDigits;
    })

    this.fax.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  formatDepartments(person: any) {
    if (person.department === 'IT') {
      this.byDepartments.it.push(person);
    } else if (person.department === 'HR') {
      this.byDepartments.hr.push(person);
    } else if (person.department === 'Police') {
      this.byDepartments.police.push(person);
    } else if (person.department === 'Fire') {
      this.byDepartments.fire.push(person);
    } else if (person.department === 'Clerk') {
      this.byDepartments.clerk.push(person);
    } else if (person.department === 'Treasury') {
      this.byDepartments.treasury.push(person);
    }
  }

  sortArrays() {
    this.departments.forEach((dept) => {
      this.byDepartments[dept].sort((a: any, b:any) => a.lname.localeCompare(b.lname));
    });
  }

  uponLogout(directory: string) {
    this.directorySelected = directory;
    this.snackBar.open('Logged out.', 'Close', {
      duration: 6000,
    });
  }

  changeDirectory(event: any) {
    this.searchText = "";
    this.directorySelected = event.value;
  }

  adminDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'error') {
        this.snackBar.open('Error logging in.', 'Close', {
          duration: 6000,
        });
      } else if (result) {
        this.snackBar.open('Success!', 'Close', {
          duration: 6000,
        });
      }
    })
  }
}
