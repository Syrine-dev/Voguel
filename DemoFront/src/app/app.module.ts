import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {UserService} from "./user/user.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@Angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginComponent } from './login/login.component';
import { OperationComponent } from './operation/operation.component';
import { TableComponent } from './table/table.component';
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {ProgressBarModule} from "primeng/progressbar";
import {MultiSelectModule} from "primeng/multiselect";
import {SliderModule} from "primeng/slider";
import {InputTextModule} from "primeng/inputtext";
import {OperationService} from "./operation/operation.service";

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    OperationComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, ProgressBarModule, MultiSelectModule, SliderModule, InputTextModule,

  ],
  providers: [UserService , OperationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
