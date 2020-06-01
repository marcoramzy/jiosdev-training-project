import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  boolTrue = true;
  boolFalse = false;

  constructor() { }

  ngOnInit(): void {
  }

}
