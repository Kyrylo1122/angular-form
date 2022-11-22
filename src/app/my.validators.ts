import { FormControl } from '@angular/forms';

export class MyValidators {
  static restrictedEmails(control: FormControl): { [key: string]: boolean } {
    return {};
  }
}
