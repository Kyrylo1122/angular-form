import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public passwordForm!: FormGroup;
  showPassword: boolean = false;

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.required,
      ]),
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
