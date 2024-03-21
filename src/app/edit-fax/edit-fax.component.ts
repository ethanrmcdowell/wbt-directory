import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';

@Component({
  selector: 'app-edit-fax',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatSelectModule, MatListModule, MatIconModule, MatInputModule, MatFormFieldModule],
  templateUrl: './edit-fax.component.html',
  styleUrl: './edit-fax.component.css'
})
export class EditFaxComponent {
  constructor(private dataService: DataService, private snackBar: MatSnackBar) {};

  @Input() faxes: any;
  @Output() onUpdate = new EventEmitter<string>();
  searchFax: string = "";

  ngOnInit() {
    this.faxes.forEach((fax: any) => {
      fax.number = fax.number.replace(/[^\d]/g, '');
      console.log(fax);
    });
  }

  deleteFax(fax: any) {
    if (window.confirm("Are you sure you'd like to delete this fax number? This decision cannot be reversed!")) {
      this.dataService.deleteFax(fax).then(() => {
        this.onUpdate.emit();
        this.searchFax = "";
      }).catch(error => {
        console.error(error);
        this.snackBar.open('Error - unable to delete!', 'Close', {
          duration: 6000,
        });
      });
    }
  }

  saveChanges(fax: any) {
    let updatedFax = {
      name: fax.name,
      number: fax.number,
    }

    this.dataService.updateFax(updatedFax, fax.id).then(() => {
      this.onUpdate.emit();
      fax.edit = !fax.edit;
    }).catch(error => {
      console.error(error);
      this.snackBar.open('Error - unable update!', 'Close', {
        duration: 6000,
      });
    });
  }
}
