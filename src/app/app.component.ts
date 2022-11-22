import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      password: new FormControl(null, [
        Validators.minLength(58),
        Validators.required,
      ]),
    });
  }
  onSubmit() {
    const formData = { ...this.form.value };
    console.log('formData: ', formData);
  }
}
