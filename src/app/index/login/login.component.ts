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
    loginPassword: ""
  };

  registration = {
    registerEmail: "",
    registerPassword: ""
  };

  errorInUserCreate = false;
  errorMessage: any;
  customer : Customer;

  loginForm : FormGroup;
  registerForm : FormGroup;

  constructor(
    private authService: AuthService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.loginForm = this.createLoginFormGroup();
    this.registerForm = this.createRegisterFormGroup();
  }

  createLoginFormGroup() {
    return new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      loginPassword: new FormControl('',[Validators.required]),
    });
  }

  createRegisterFormGroup() {
    return new FormGroup({
      registerEmail: new FormControl('',[Validators.required,Validators.email]),
      registerPassword: new FormControl('',[Validators.required]),
    });
  }

  register() {
    this.registration = this.registerForm.value;
    this.authService.register(new Customer(null, this.registration.registerEmail, this.registration.registerPassword, "laala" , "kolbu"));

  }

  signIn() {
    this.credentials = this.loginForm.value;
    this.authService.signIn(this.credentials.email, this.credentials.loginPassword);
  }

}
