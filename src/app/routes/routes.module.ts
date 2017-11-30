import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';

import { AuthService } from '../core/auth/auth.service'

import { SharedModule } from '../shared/shared.module'
import { PagesModule } from './pages/pages.module'
import { SystemModule } from './system/system.module'

import { routes } from './routes'


@NgModule({
    providers: [
        AuthService
    ],
    declarations: [ ],
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule,
        SystemModule
    ],
    exports: [ RouterModule ]
})

export class RoutesModule {
    constructor() { }
}
