import { NgModule } from '@angular/core';

import { LayoutComponent } from  './layout.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './sidebar/sidebar.component';

import { SharedModule } from '../shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
    imports: [
        SharedModule,
        NgZorroAntdModule
    ],
    providers: [],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SideBarComponent
    ],
    exports: [
        LayoutComponent,
        HeaderComponent,
        SideBarComponent
    ]
})
export class LayoutModule { }
