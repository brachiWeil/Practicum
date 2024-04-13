
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

export const routes: Routes = [ 
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login', component: LoginComponent},
    { path: 'employees', loadChildren: () => import('./employee.module').then(m => m.EmployeeModule) },
    { path: '**', component: NotFoundComponent }
  ];

    
