import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { SharedModule } from '../../shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { UserComponent } from './user/list/user.component'
import { UserAddComponent } from './user/add/user_add.component'
import { MenuComponent } from './menu/list/menu.component'
import { MenuAddComponent } from './menu/add/menu_add.component'

const routes: Routes = [
    { path: 'user', component: UserComponent},
    { path: 'menu', component: MenuComponent}
]

@NgModule({
    imports: [
        SharedModule,
        NgZorroAntdModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        UserComponent,
        UserAddComponent,
        MenuComponent,
        MenuAddComponent
    ],
    exports: [
        RouterModule
    ]
})

export class SystemModule { }
