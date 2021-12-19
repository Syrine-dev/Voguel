import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@Angular/router';
import "@angular/compiler"
import {UserComponent} from "./user/user.component";
import {TableComponent} from "./table/table.component";
import {LoginComponent} from "./login/login.component";
import {OperationComponent} from "./operation/operation.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  {path: 'table', component: TableComponent },
  {path: 'table/:id', component: TableComponent },
  {path: 'register', component: UserComponent},
  {path: 'operation', component: OperationComponent},
  {path: 'operation/:id', component: OperationComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
