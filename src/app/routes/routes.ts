import { Routes } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [ AuthService ],
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: '', pathMatch: 'full' },
            { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
            { path: 'system', loadChildren: './system/system.module#SystemModule' }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
]
