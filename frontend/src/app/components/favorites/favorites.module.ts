import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [FavoritesComponent],
  declarations: [FavoritesComponent],
  imports: [CommonModule, MatIconModule],
})
export class FavoritesModule {}
