import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './Content.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { ContentRoutingModule } from './Content-routing.module';
import { HomeModule } from './Home/Home.module';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule,
    HomeModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    ContentComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class ContentModule { }
