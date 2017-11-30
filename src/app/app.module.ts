import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';

import { HttpService } from './core/http/http.service'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont' }),
    ],
    providers: [ HttpService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

    constructor(private httpService: HttpService) {
        httpService.setToken(window.localStorage.token)
    }

}
