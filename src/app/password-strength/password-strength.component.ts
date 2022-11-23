import { Component, OnChanges, Input, SimpleChange } from '@angular/core';
import { TitleStrategy } from '@angular/router';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent {
  @Input() passwordToCheck!: string;
  @Input() minLength: number = 8;

  private colors = ['red', 'yellow ', 'green'];
  private strengthLevel = ['Easy', 'Medium', 'Strong'];
  public strengthText = '';
  public strengthTextColor = '';
  public complicatedObject: { [key: string]: string } = {
    bar0: '',
    bar1: '',
    bar2: '',
  };
  public feedback: { label: string; status: boolean }[] = [];

  checkStrength(p: string) {
    // 1
    this.clearFeedback();
    let force = 0;
    let passedMatches = 0;

    passedMatches = this.isSpecialCarMet(p) ? passedMatches + 1 : passedMatches;
    passedMatches = this.isNumberCarMet(p) ? passedMatches + 1 : passedMatches;
    passedMatches = this.isLetterCarMet(p) ? passedMatches + 1 : passedMatches;
    // 5
    force += 2 * p.length + (p.length >= 10 ? 1 : 0);
    force += passedMatches * 10;

    // 6
    force = p.length <= 7 ? Math.min(force, 10) : force;

    // 7
    force = passedMatches === 1 ? Math.min(force, 10) : force;
    force = passedMatches === 2 ? Math.min(force, 20) : force;
    force = passedMatches === 3 ? Math.min(force, 30) : force;

    return force;
  }
  isLengthMet(password: string) {
    this.clearFeedback();

    if (password.length >= this.minLength) {
      this.feedback.push({
        label: `Minimum ${this.minLength} characters`,
        status: true,
      });
      return true;
    }
    this.feedback.push({
      label: `Minimum ${this.minLength} characters`,
      status: false,
    });
    return false;
  }

  isSpecialCarMet(password: string) {
    const regex = /[$-/:-?{-~!"^_@#`\[\]]/g;

    if (regex.test(password)) {
      this.feedback.push({
        label: 'One special character',
        status: true,
      });
      return true;
    }
    this.feedback.push({
      label: 'One special character',
      status: false,
    });
    return false;
  }

  isNumberCarMet(password: string) {
    if (/[0-9]+/.test(password)) {
      this.feedback.push({
        label: 'One number character',
        status: true,
      });
      return true;
    }
    this.feedback.push({
      label: 'One number character',
      status: false,
    });
    return false;
  }
  isLetterCarMet(password: string) {
    if (/[a-z]/gi.test(password)) {
      this.feedback.push({
        label: 'One letter character',
        status: true,
      });
      return true;
    }
    this.feedback.push({
      label: 'One letter character',
      status: false,
    });
    return false;
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(3, '#DDD');
    if (!password.length) {
      this.clearFeedback();
      this.clearStrengthText();

      return;
    }
    this.setBarColors(3, '#DDD');
    if (!this.isLengthMet(password)) {
      this.setBarColors(3, '#a00');
      this.clearStrengthText();

      return;
    }
    if (password) {
      const strengthOfPassword = this.checkStrength(password);
      const c = this.getColorAndText(strengthOfPassword);
      this.strengthText = c.strengthText;
      this.strengthTextColor = c.color;
      this.setBarColors(c.index, c.color);
    }
  }

  private getColorAndText(s: number) {
    let index = 0;
    if (s === 10) {
      index = 0;
    } else if (s === 20) {
      index = 1;
    } else {
      index = 2;
    }
    return {
      index,
      color: this.colors[index],
      strengthText: this.strengthLevel[index],
    };
  }
  private clearStrengthText() {
    this.strengthText = '';
  }
  private clearFeedback() {
    this.feedback = [];
  }

  private setBarColors(count: number, col: string) {
    for (let n = 0; n <= count; n++) {
      this.complicatedObject['bar' + n] = col;
    }
  }
}
