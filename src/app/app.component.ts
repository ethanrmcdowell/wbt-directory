import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { employeeData } from '../assets/employees';

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

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, MatDialogModule, MatIconModule, MatRadioModule, MatToolbarModule, MatListModule, MatDividerModule, MatBadgeModule, MatInputModule, MatFormFieldModule, FormsModule, MatChipsModule, PersonListComponent, AllEmployeesComponent, DepartmentEmployeesComponent, FaxNumbersComponent, AdminPanelComponent]
})
export class AppComponent {
  title = 'wbt-directory';
  isMobile: boolean = true;
  userAuthenticated: boolean = false;
  people: any = [];
  fax: any = [];
  searchText: string = "";
  directorySelected: string = "all";
  departments: string[] = ["assessing", "inspection", "building", "budget", "clerk", "code", "facilities", "finance",
    "hr", "it", "pds", "engineering", "environmental", "planning", "purchasing", "supervisor", "treasurer",
    "water", "water_billing", "fire", "payroll", "police", "records"];
  showAdmin: boolean = false;
  byDepartments: any = {
    assessing: [],
    inspection: [],
    budget: [],
    building: [],
    clerk: [],
    code: [],
    facilities: [],
    finance: [],
    hr: [],
    it: [],
    pds: [],
    engineering: [],
    environmental: [],
    payroll: [],
    planning: [],
    purchasing: [],
    supervisor: [],
    treasurer: [],
    water: [],
    water_billing: [],
    fire: [],
    police: [],
    records: [],
  };

  constructor(private BreakpointObserver: BreakpointObserver, private dataService: DataService, public dialog: MatDialog, private authService: AuthService, private snackBar: MatSnackBar) {
    this.authService.userAuthenticated$.subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
  } 

  async ngOnInit() {
    this.BreakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile = result.matches;
    });

    this.showAdmin = false;
    this.authService.checkUserStatus();

    await this.getDirectoryData();
    await this.getFaxData();

    this.sortArrays();
  }

  async onAdminUpdate() {
    this.snackBar.open('Updated employee directory!', 'Close', {
      duration: 6000,
    });

    await this.getDirectoryData();
    await this.getFaxData();
    this.sortArrays();
  }

  addToFirestore(person: any) {
    this.dataService.addEmployee(person);
  }

  async getDirectoryData() {
    this.people = [];
    this.people = await this.dataService.getDirectoryData();

    this.people.forEach((person: any) => {
      this.formatDepartments(person);
    });

    console.log(this.people);
    this.showAdmin = true;
  }

  async getFaxData() {
    this.fax =  await this.dataService.getFaxData();

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
    } else if (person.department === 'Treasurer') {
      this.byDepartments.treasurer.push(person);
    } else if (person.department === 'Assessing') {
      this.byDepartments.assessing.push(person);
    } else if (person.department === 'Building') {
      this.byDepartments.building.push(person);
    } else if (person.department === 'Budget') {
      this.byDepartments.budget.push(person);
    } else if (person.department === 'Inspection') {
      this.byDepartments.inspection.push(person);
    } else if (person.department === 'Code') {
      this.byDepartments.code.push(person);
    } else if (person.department === 'Facilities') {
      this.byDepartments.facilities.push(person);
    } else if (person.department === 'Finance') {
      this.byDepartments.finance.push(person);
    } else if (person.department === 'PDS') {
      this.byDepartments.pds.push(person);
    } else if (person.department === 'Engineering') {
      this.byDepartments.engineering.push(person);
    } else if (person.department === 'Environmental') {
      this.byDepartments.environmental.push(person);
    } else if (person.department === 'Planning') {
      this.byDepartments.planning.push(person);
    } else if (person.department === 'Supervisor') {
      this.byDepartments.supervisor.push(person);
    } else if (person.department === 'Water') {
      this.byDepartments.water.push(person);
    } else if (person.department === 'Water Billing') {
      this.byDepartments.water_billing.push(person);
    } else if (person.department === 'Records') {
      this.byDepartments.records.push(person);
    } else if (person.department === 'Purchasing') {
      this.byDepartments.purchasing.push(person);
    } else if (person.department === 'Payroll') {
      this.byDepartments.payroll.push(person);
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
