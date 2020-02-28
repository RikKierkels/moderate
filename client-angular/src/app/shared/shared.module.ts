import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { TagComponent } from './components/tag/tag.component';

@NgModule({
  imports: [CommonModule, PipesModule],
  exports: [CommonModule, PipesModule, TagComponent],
  declarations: [TagComponent]
})
export class SharedModule {}
