import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, PipesModule],
  exports: [CommonModule, PipesModule]
})
export class SharedModule {}
