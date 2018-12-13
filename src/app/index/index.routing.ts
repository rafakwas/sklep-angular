import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";
import {LoginComponent} from "./login/login.component";

export const IndexRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: IndexComponent
      },
      {
        path: "login",
        component: LoginComponent
      }
      ]
  }
];
