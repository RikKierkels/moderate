import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { IdeaCreateComponent } from './idea-create/idea-create.component';
import { AuthGuard } from '../auth/auth.guard';
import { IdeaDetailComponent } from './idea-detail/idea-detail.component';
import { CanDeactivateGuard } from '../shared/can-deactivate.guard';
import { IdeaHomeComponent } from './idea-home/idea-home.component';

const routes: Routes = [
  {
    path: 'ideas',
    component: IdeaHomeComponent,
    children: [
      {
        path: '',
        component: IdeaListComponent
      },
      {
        path: 'create',
        component: IdeaCreateComponent,
        canActivate: [AuthGuard],
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: ':id/edit',
        component: null
      },
      { path: ':id', component: IdeaDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IdeaRoutingModule {}
