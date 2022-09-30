import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { VideoDialogComponent } from './video-dialog.component';

@NgModule({
  exports: [VideoDialogComponent],
  declarations: [VideoDialogComponent],
  imports: [CommonModule, MatDialogModule],
})
export class VideoDialogModule {}
