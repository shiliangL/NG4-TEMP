import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { LoginComponent } from './login/login.component'

@NgModule({
    imports: [
        SharedModule,
        NgZorroAntdModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]
})
export class PagesModule { }
