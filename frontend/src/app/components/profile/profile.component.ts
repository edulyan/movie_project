import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: IUser = {} as IUser;
  authenticated = false;
  errorMessage: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUserCookie().subscribe(
      (data: any) => (this.user = data),
      (error) => {
        this.errorMessage = error.message;
        console.log(error);
      }
    );
  }

  logout() {
    return this.authService
      .logout()
      .subscribe(() => (this.authenticated = false));
  }
}
