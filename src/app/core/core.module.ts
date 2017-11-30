import { NgModule } from '@angular/core';

import { SettingsService } from './settings/settings.service';

@NgModule({
    imports: [],
    providers: [
        SettingsService
    ],
    declarations: [],
    exports: []
})

export class CoreModule {
    constructor() {
    }
}
