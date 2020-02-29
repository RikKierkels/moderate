import { NgModule } from '@angular/core';
import { IdeaRoutingModule } from './idea-routing.module';
import { IdeaGridComponent } from './idea-grid/idea-grid.component';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { IdeaGridItemComponent } from './idea-grid-item/idea-grid-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IdeaDetailComponent } from './idea-detail/idea-detail.component';
import { IdeaHomeComponent } from './idea-home/idea-home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    IdeaHomeComponent,
    IdeaGridComponent,
    IdeaGridItemComponent,
    IdeaDetailComponent,
    IdeaCreateComponent
  ],
  imports: [SharedModule, IdeaRoutingModule, ReactiveFormsModule]
})
export class IdeaModule {}
