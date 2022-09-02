import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  exports: [HomeComponent],
  declarations: [HomeComponent],
  imports: [CommonModule, MatInputModule, MatFormFieldModule],
})
export class HomeModule {}
