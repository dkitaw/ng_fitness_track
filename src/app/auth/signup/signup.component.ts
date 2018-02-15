import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  maxDate;

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date();       // new Date is today
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);     // This will give me maxDate( which is today) 18 - yrears ago
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}
