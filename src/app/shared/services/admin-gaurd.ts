import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.isSignedIn() && this.authService.isRole('ADMIN')) {
      return true;
    }
    this.router.navigate(["no-access"]);
    return false;
  }
}
