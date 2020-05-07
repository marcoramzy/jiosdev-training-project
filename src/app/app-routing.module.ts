import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //, pathMatch: 'full'
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  { path: 'people', loadChildren: () => import('./people/people.module').then(m => m.PeopleModule)},
  { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
