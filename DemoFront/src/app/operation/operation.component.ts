import {Component, OnInit} from '@angular/core';
import {OperationService} from "./operation.service";
import {UserService} from "../user/user.service";
import {ActivatedRoute, Router} from "@Angular/router";
import {Operation} from "./operation";
import {OperationRequest} from "./operationRequest";

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {
  private url: string;
  private mail: string;
  type: any;
  codeCompte2: string = "";
  montant: any;

  constructor(private operationService: OperationService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    this.activatedRoute.url.subscribe(activeUrl => {
      this.url = window.location.pathname.valueOf();
      this.mail = (activeUrl[1].path);
      console.log("activated ", this.mail);
    });


  }

  ngOnInit(): void {
  }

  submit() {
    let valid = true;
    let request: OperationRequest = {} as OperationRequest;
    request.typeOperation = this.type;
    request.montant = this.montant;
    request.codeCompte1 = this.userService.connectedUser.codeCompte;

    if(this.type == "VIREMENT" || this.type == "DEPOT"  ) {
       let compteType = this.userService.connectedUser.type;
       if(compteType == "Type1") {
         if(this.montant > 500) {
           valid = false;
           alert('FAILURE!! :-c \n\n Amount > 500$ !' );
         }
       }else if(compteType == "Type2") {
         if(this.montant > 1000) {
           valid = false;
           alert('FAILURE!! :-c \n\n Amount > 1000$ !' );
         }
       }else if(compteType == "Type3") {
         if(this.montant > 1500) {
           valid = false;
           alert('FAILURE!! :-c \n\n Amount > 1500$ !' );
         }
       }
    }
    if (this.type == "VIREMENT") {
      request.codeCompte2 = this.codeCompte2;
    }
    if(valid) {
      this.operationService.saveOperation(request).subscribe(res => {
        console.log(res);
        this.router.navigate(['table/' + this.mail]);
      })
    }


  }



}
