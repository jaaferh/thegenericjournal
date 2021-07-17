import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Login } from 'src/app/models/user.entity';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login = {} as Login;
 
  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: ToasterService
  ) { }

  onSubmit(): void {
    if (this.login) {
      this.userService.loginUser(this.login).subscribe(d => {
        void this.router.navigate(['/']);
        this.toaster.pop('success', 'Successfully Logged In');
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }

}
