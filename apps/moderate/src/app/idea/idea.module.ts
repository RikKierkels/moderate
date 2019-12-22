import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaRoutingModule } from './idea-routing.module';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { IdeaListItemComponent } from './idea-list-item/idea-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IdeaListComponent, IdeaCreateComponent, IdeaListItemComponent],
  imports: [CommonModule, IdeaRoutingModule, ReactiveFormsModule]
})
export class IdeaModule {}
