import { Component, OnInit } from '@angular/core';

import { SettingsService } from '../../core/settings/settings.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    type = 'menu-fold';
    logoClass = 'logo';

    constructor(private settings: SettingsService) {

    }

    ngOnInit() {

    }

    toggleCollapsedSideabar() {
        this.settings.layout.isCollapsed = !this.settings.layout.isCollapsed;
        this.type = this.settings.layout.isCollapsed ? 'menu-unfold' : 'menu-fold';
        this.logoClass = this.settings.layout.isCollapsed ? 'logo-min' : 'logo';
    }

}
