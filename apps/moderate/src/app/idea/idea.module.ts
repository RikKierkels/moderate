import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaRoutingModule } from './idea-routing.module';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { IdeaListItemComponent } from './idea-list-item/idea-list-item.component';

@NgModule({
  declarations: [IdeaListComponent, IdeaCreateComponent, IdeaListItemComponent],
  imports: [CommonModule, IdeaRoutingModule]
})
export class IdeaModule {}
