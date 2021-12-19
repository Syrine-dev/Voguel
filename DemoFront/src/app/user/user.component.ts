import {Component, OnInit} from '@angular/core';
import {User} from "./user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@Angular/router";
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  registreForm: FormGroup;
  users: User[] | undefined;
  error_messages = {
    'nom': [
      {type: 'required', message: 'FirstName is required.'},
    ],
    'prenom': [
      {type: 'required', message: 'LastName is required.'}
    ],
    'mail': [
      {type: 'required', message: 'e-mail is required.'},
      {type: 'minlength', message: 'e-mail length.'},
      {type: 'maxlength', message: 'e-mail length.'},
      {type: 'email', message: 'please enter a valid mail address.'}
    ],
    'motDePasse': [
      {type: 'required', message: 'password is required.'},
      {type: 'minlength', message: 'password length.'},
      {type: 'maxlength', message: 'password length.'}
    ],
    'confirmotDePasse': [
      {type: 'required', message: 'confirm password is required.'},
      {type: 'minlength', message: 'confirm password length.'},
      {type: 'maxlength', message: 'confirm password length.'}
    ],
  };
  valid: boolean | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.user = new User();
    this.registreForm = this.formBuilder.group({
      nom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      prenom: new FormControl('', Validators.compose([
        Validators.required
      ])),
      mail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      motDePasse: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
      confirmotDePasse: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),
    }, {
      validators: this.password.bind(this) || this.checkUserExists.bind(this)
    });

  }

  onSubmit() {

    if (this.registreForm.valid && !this.checkUserExists(this.user.nom)) {
      this.userService.addUser(this.user).subscribe(result => {

        this.gotologin();
      });
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registreForm.value));
    }

  }

  gotologin() {
    {
      this.router.navigate(['/login']);
    }
  }


  ngOnInit() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }


  password(formGroup: FormGroup) {

    const {value: password} = formGroup.get('motDePasse');
    const {value: confirmPassword} = formGroup.get('confirmotDePasse');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

  checkUserExists(mail: string) {
    if (this.users && this.users.length > 0) {
      for (let user of this.users) {
        if (user.mail == mail) {
          return true;
        }
      }
    }

    return false;
  }

}
