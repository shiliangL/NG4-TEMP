import { Component, OnInit } from '@angular/core';
import { Router } from  '@angular/router'
import { SettingsService } from '../core/settings/settings.service'
import {routes} from "../routes/routes";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    isShow = false
    activateRoute = ''

    tabs = [
        {
            name: 'Tab 1'
        },
        {
            name: 'Tab 2'
        }
    ];

    constructor(private router: Router, private settings: SettingsService) {
        router.events.subscribe((event) => {
            console.log(event);
        });
    }

    ngOnInit() {
    }

    initRouter() {

    }

    closeTab(tab) {
        this.tabs.splice(this.tabs.indexOf(tab), 1);
    };

    newTab() {
        this.tabs.push({
            name: 'New Tab'
        });
    };

}
