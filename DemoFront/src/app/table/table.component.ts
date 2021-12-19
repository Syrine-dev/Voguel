import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user/user.service";
import {OperationService} from "../operation/operation.service";
import {ActivatedRoute, Router} from "@Angular/router";
import {User} from "../user/user";
import {FormGroup} from "@angular/forms";
import {Operation} from "../operation/operation";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {





  operations: Operation[];
  registreForm: FormGroup;
  private url: string;
   soldeAcc: number;
  cdcompte : any ;
  mail: string;
  selectedComptes: any;


  constructor(private operationService: OperationService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.activatedRoute.url.subscribe(activeUrl => {
      this.url = window.location.pathname.valueOf();
      this.mail = (activeUrl[1].path);
      this.userService.connectedUser.mail=this.mail
      console.log("activated ", this.mail);
    });


  }

  handleInput(event: Event) {
    return (<HTMLTextAreaElement>event.target).value;
  }

  ngOnInit() {
    this.cdcompte = this.userService.connectedUser.codeCompte
    this.operationService.getOperationsByCodeCompte(this.userService.connectedUser.codeCompte).subscribe(data => {
      this.operations = data;
      this.soldeAcc = this.operations[this.operations.length-1].solde ;
    });

  }
operation() {
  this.router.navigate(['operation/' +  this.userService.connectedUser.mail]);
}

}
