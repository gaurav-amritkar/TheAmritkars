import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './Content.component';
import { LoginComponent } from './Login/Login.component';
import { RegisterComponent } from './Register/Register.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { ContentRoutingModule } from './Content-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    ContentComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class ContentModule {}
