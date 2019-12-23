import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { AuthGuard } from '../auth/auth.guard';
import { IdeaDetailComponent } from './idea-detail/idea-detail.component';

const routes: Routes = [
  { path: ':id', component: IdeaDetailComponent },
  { path: 'list', component: IdeaListComponent },
  { path: 'create', component: IdeaCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeaRoutingModule {}
