import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-fax',
  standalone: true,
  imports: [MatInputModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './add-fax.component.html',
  styleUrl: './add-fax.component.css'
})
export class AddFaxComponent {
  constructor(private dataService: DataService, private snackBar: MatSnackBar) {};

  @Output() onUpdate = new EventEmitter<string>();

  newFaxForm = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
  });

  addFax() {
    this.dataService.addFax(this.newFaxForm.value).then(() => {
      this.onUpdate.emit();
    }).catch(error => {
      console.error(error);
      this.snackBar.open('Error!', 'Close', {
        duration: 6000,
      });
    });
  }
}
