import { Component, Directive, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ThousandSeparatorDirective } from './thousandSeperator.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule  , ThousandSeparatorDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  symbolInfoForm: FormGroup | undefined;
  isSymbolInfoFormSubmitted = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.symbolInfoForm = this.fb.group({
      tseLink: ['' , Validators.required],
      codalLink: ['' , Validators.required],
      lastPrice: ['' , Validators.required],
      marketValue: ['' , Validators.required],

    });
  }
  get symbolInfoFormSubmittedInfo() {
    return this.symbolInfoForm.controls;
  }


  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit(fomrValue: FormGroup) {
    console.log(fomrValue);
    
    if (this.symbolInfoForm.invalid) {
      this.isSymbolInfoFormSubmitted = true;
      return;
    }

  }


}
