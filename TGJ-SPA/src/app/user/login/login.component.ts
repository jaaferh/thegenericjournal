import { Component, OnInit } from '@angular/core';
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
    private toaster: ToasterService
  ) { }

  onSubmit(): void {
    if (this.login) {
      this.userService.loginUser(this.login).subscribe(() => {
        // Reload and navigate to homepage simultaneously
        window.location.href = window.location.protocol + '//' + window.location.host + '/';
        this.toaster.pop('success', 'Successfully Logged In');
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }

}
