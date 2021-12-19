import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Operation} from "./operation";
import {User} from "../user/user";
import {OperationRequest} from "./operationRequest";

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private operationUrl: string;
  constructor(private http: HttpClient) {
    this.operationUrl = 'http://localhost:8080/Operation';
  }

  // find all transaction by user
  public getOperations(mail: string):Observable<Operation[]>  {
    return this.http.get<Operation[]>(this.operationUrl + '/getOperations/'+mail);


  }public getOperationsByCodeCompte(codeCompte: string):Observable<Operation[]>  {
    return this.http.get<Operation[]>(this.operationUrl + '/getOperationsByCodeCompte/'+codeCompte);
  }

  public addTransa(mail: string , compte : Operation) {
    return this.http.post<Operation>(this.operationUrl + '/addOperation/'+mail, compte);
  }


  public saveOperation(req: OperationRequest) {
    return this.http.post<any>(this.operationUrl + '/saveOperation/', req);
  }
}
