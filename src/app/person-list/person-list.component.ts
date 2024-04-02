import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Person } from '../models';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDividerModule, MatBadgeModule, MatIconModule, ClipboardModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent {
  constructor(private snackBar: MatSnackBar) {};

  @Input() searchText: string = '';
  @Input() person: any;
  @Input() isMobile: any;

  formatPhone(phone: any) {
    let areaCode = phone.substring(0,3);
    let middleDigits = phone.substring(3,6);
    let endDigits = phone.substring(6);

    let phoneFormat = "(" + areaCode + ") " + middleDigits + "-" + endDigits;
    return phoneFormat;
  }

  copyEmail() {
    this.snackBar.open('E-mail copied to clipboard.', 'Close', {
      duration: 4000,
    });
  }
}
