import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
  constructor(private authService: AuthService) {};

  @Output() onLogout = new EventEmitter<string>();

  logoutUser() {
    this.authService.logOutUser((response) => {
      console.log(response);
      this.onLogout.emit('all');
    });
  }
}
