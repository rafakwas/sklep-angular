import { Routes } from "@angular/router";
import { IndexComponent } from "./index.component";

export const IndexRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: IndexComponent
      }
      ]
  }
];
