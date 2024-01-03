import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDividerModule, MatBadgeModule],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent {
  @Input() searchText: string = '';
  @Input() person: any;
  @Input() isMobile: any;
}
