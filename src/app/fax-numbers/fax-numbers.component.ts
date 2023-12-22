import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fax-numbers',
  standalone: true,
  imports: [],
  templateUrl: './fax-numbers.component.html',
  styleUrl: './fax-numbers.component.css'
})
export class FaxNumbersComponent {
  @Input() faxes: any;
}
