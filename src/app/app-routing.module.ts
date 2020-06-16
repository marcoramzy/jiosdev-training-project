import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotAuthenticatedGuard } from './auth/notAuthenticated.guard';
import { AuthGuard } from './auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'Account', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) , canActivate: [NotAuthenticatedGuard] },
  { path: 'calender', loadChildren: () => import('./calender/calender.module').then(m => m.CalenderModule) , canActivate: [AuthGuard]},
  { path: '', component: LayoutComponent,
  children: [
    { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
    { path: 'people', loadChildren: () => import('./people/people.module').then(m => m.PeopleModule)},
    { path: 'groups', loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)},
  ], canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
