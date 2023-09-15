import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  isLoading = false;
  users: User[] = [];
  loadingError: any = null;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.userService
      .getUsers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (result) => {
          this.users = result;
          this.loadingError = null;
        },
        error: (e) => {
          console.error(e);
          this.loadingError = e;
        },
      });
  }
}
