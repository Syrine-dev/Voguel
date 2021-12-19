import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@Angular/router";
import {UserService} from "../user/user.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../user/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[] = [] ;
  user: User;
  mail : string ;
  loginForm: FormGroup;
  pwdValid: boolean = false;
  displayNameError: boolean = false;
  displayPwdError: boolean = false;
  error_messages = {
    'mail': [
      { type: 'required', message: 'please enter your e-mail !.' }
    ],

    'motDePasse': [
      { type: 'required', message: 'password is required.' },
    ],
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public formBuilder: FormBuilder
  ) {
    this.user = new User();
    this.loginForm = this.formBuilder.group({
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(0)

      ])),
      motDePasse: new FormControl('', Validators.compose([
        Validators.required,
      ])),

    });

  }


  onSubmit() {
    this.displayNameError = false;
    this.displayPwdError = false;
    if (this.loginForm.valid && this.checkUserExists(this.user.mail, this.user.motDePasse) && this.pwdValid) {
      let id = 0;
      for (let user of this.users) {
        if (user.mail == this.user.mail) {
          this.mail = user.mail
          this.userService.getUserByMail(user.mail).subscribe(data => {
            this.userService.connectedUser = data;
            console.log('user', this.userService.connectedUser);
            this.router.navigate(['table/' + this.mail]);
            // alert('SUCCESS!! :-)\n\n' + JSON.stringify(id));
          });

        }
      }
    }
    if (this.loginForm.valid && this.checkUserExists(this.user.mail, this.user.motDePasse)
      && !this.pwdValid) {
      alert('ECHEC!! :(\n\n' + JSON.stringify(this.loginForm.value) + 'Echec password');
      this.displayPwdError = true;
    }
    if (this.loginForm.valid && !this.checkUserExists(this.user.mail, this.user.motDePasse)) {
      alert('ECHEC!! :(\n\n' + JSON.stringify(this.loginForm.value) + 'Echec e-mail');
      this.displayNameError = true;

    }


  }

/*
  gotoUserList() {
    this.router.navigate(['/login']);
    this.userService.isAuthenticated = true;
  }*/

  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.onSubmit() ;
    });


  }
  checkUserExists(mail: string, motDePasse: string) {

    let userExisted: boolean = false ;
    for (let user of this.users) {
      if (user.mail == mail){
        userExisted = true;
        if(user.motDePasse == motDePasse) {
          this.pwdValid = true;
        }

        break;
      }
    }
    return userExisted;
  }

}
