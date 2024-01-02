import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  constructor(private authService: AuthService, private dialogRef: MatDialogRef<LoginDialogComponent>) {
    this.authService.userAuthenticated$.subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    });
  }

  email: string = '';
  password: string = '';
  userAuthenticated: boolean = false;

  adminLogin() {
    this.authService.loginUser(this.email,  this.password, async (response) => {
      if (response.success) {
        console.log("SUCCESS", response);
        this.dialogRef.close(response.success);
      } else {
        console.log("FAILURE", response);
      }
    })
  }
}
