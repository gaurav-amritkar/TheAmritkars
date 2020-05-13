import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { HomeComponent } from './Home.component';
import { HomeRoutingModule } from './Home-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
  ]
})
export class HomeModule { }
