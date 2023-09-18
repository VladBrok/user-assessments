import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { logout } from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  // TODO: communicate via store only (remove dependency from AuthService) ?
  constructor(public auth: AuthService, private store: Store) {}

  logout() {
    this.store.dispatch(logout());
  }
}
