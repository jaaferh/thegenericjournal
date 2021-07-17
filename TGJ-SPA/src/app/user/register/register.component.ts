import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { Register } from 'src/app/models/user.entity';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  register = {} as Register;

  constructor(
    private userService: UserService,
    private router: Router,
    private toaster: ToasterService
  ) { }

  onSubmit(): void {
    if (this.register) {
      this.userService.registerUser(this.register).subscribe(() => {
        this.toaster.pop('success', 'Successfully Registered. Please Log In');
        void this.router.navigate(['/login']);
      }, error => {
        this.toaster.pop('error', error);
      });
    }
  }

  dateChange(dateString: string): void {
    if (dateString) {
      this.register.date_of_birth = new Date(dateString);
    }
  }

  confirmPassword(): boolean {
    if (this.register.password !== this.register.confirm_pass) {
      this.registerForm.form.controls['confirmPass'].setErrors({'incorrect': true});
      return false;
    }

    return true;
  }
}
