import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-fax-numbers',
  standalone: true,
  imports: [CommonModule, MatListModule, MatDividerModule, MatBadgeModule],
  templateUrl: './fax-numbers.component.html',
  styleUrl: './fax-numbers.component.css'
})
export class FaxNumbersComponent {
  @Input() faxes: any;
}
