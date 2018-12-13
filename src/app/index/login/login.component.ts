import { Component, OnInit } from '@angular/core';
import {NgForm, EmailValidator, FormGroup, Validators, FormControl} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {ToastrService} from "../../shared/services/toastr.service";
import {AuthService} from "../../shared/services/auth.service";
import {Customer} from "../../shared/models/customer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [EmailValidator]
})
export class LoginComponent implements OnInit {

  credentials = {
    email: "",
    password: ""
  };

  errorInUserCreate = false;
  errorMessage: any;
  customer : Customer;

  loginForm : FormGroup;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loginForm = this.createLoginFormGroup();
  }

  createLoginFormGroup() {
    return new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
    });
  }

  addUser() {
    this.authService.register(new Customer(null, this.customer.email, this.customer.password, "laala" , "kolbu"));
  }

  signIn() {
    this.credentials = this.loginForm.value;
    this.authService.signIn(this.credentials.email, this.credentials.password);
  }

}
