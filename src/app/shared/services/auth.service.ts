import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs';
import {User} from 'firebase';
import {AngularFirestore} from 'angularfire2/firestore';
import {Customer} from '../models/customer';
import {UserData} from "../models/userData";
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from "./toastr.service";

@Injectable()
export class AuthService {

  user: Observable<User>;
  userData: Observable<any>;
  isLoggedIn: boolean;
  data: UserData = new UserData();

  constructor(private fireAuth: AngularFireAuth,
              private router: Router,
              private route: ActivatedRoute,
              private toastService: ToastrService,
              private db: AngularFirestore) {

    this.user = fireAuth.authState;
    this.user.subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        console.log('User uid provided', user.uid);
        this.userData = this.getUserData(user.uid);
        this.userData.subscribe(data => {
          console.log('User data got', data);
          if (data) {
            this.data = new UserData(data.id, data.email, data.username, data.role);
          } else {
            console.log('Not user data provided');
          }
        });
      } else {
        this.isLoggedIn = false;
        console.log('Not user uid provided, role not known');
      }
    });
  }

  register(customer: Customer) {
    this.fireAuth.auth.createUserWithEmailAndPassword(customer.email, customer.password)
      .then(value => {
        customer.id = value.user.uid;
        this.toastService.success("Pomyślnie zarejestrowałeś się!",customer.id);
        this.addUserData(customer);
      })
      .catch(error => {
        this.toastService.error('Wystąpił błąd podczas rejestracji', error.message);
      });
  }

  addUserData(customer: Customer) {
    return this.db.collection('/user').doc(customer.id).set(Object.assign({}, customer))
      .then(value => {
        console.log('Pomyślnie wprowadzono dane użytkownika!', value);
      })
      .catch(error => {
        console.log('Nie udało się wprowadzić danych', error.message);
      });
  }

  signIn(email: string, password: string) {
    this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.toastService.success("Autoryzacja powiodła się", "");

        const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");

        setTimeout((router: Router) => {
          this.router.navigate(["/products/all-products"]);
        }, 1500);
      })
      .catch((err) => {
        this.toastService.error("Autoryzacja nie powiodła się", "Nieprawidłowe dane");
      });
  }

  getUserData(userUid: string) {
    return this.db.collection('/user').doc(userUid).valueChanges();
  }

  signOut() {
    this.fireAuth.auth.signOut()
      .then(value => {
        this.toastService.success("Wylogowałeś się","");
      })
      .catch(error => {
        this.toastService.error('Nie udało się wylogować', error.message);
      });
  }

  isRole(role: string) {
    if (this.data.role) {
      return this.data.role === role;
    }
    return false;
  }

  isSignedIn() {
    return this.isLoggedIn;
  }

  isRegularUser() {
    return this.isSignedIn && (this.isRole('CUSTOMER'));
  }

  hasManagerPermissions() {
    return this.isSignedIn && (this.isRole('MANAGER') || this.isRole('ADMIN'));
  }

  hasAdminPermissions() {
    return this.isSignedIn && this.isRole('ADMIN');
  }
}
