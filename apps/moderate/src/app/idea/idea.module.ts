import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdeaRoutingModule } from './idea-routing.module';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { IdeaListItemComponent } from './idea-list-item/idea-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IdeaDetailComponent } from './idea-detail/idea-detail.component';
import { IdeaHomeComponent } from './idea-home/idea-home.component';

@NgModule({
  declarations: [
    IdeaHomeComponent,
    IdeaListComponent,
    IdeaListItemComponent,
    IdeaDetailComponent,
    IdeaCreateComponent
  ],
  imports: [CommonModule, IdeaRoutingModule, ReactiveFormsModule]
})
export class IdeaModule {}
