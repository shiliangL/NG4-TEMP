import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { SettingsService } from '../../core/settings/settings.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent implements OnInit {

    isOpenOne = true;
    sidebarClass= 'sidebar';

    constructor(public settings: SettingsService, private router: Router) {
    }

    ngOnInit() {
    }

    push() {
        // this.settings.isShow = true
        this.router.navigateByUrl('dashboard');
        // this.router.navigate([{ outlets: { popup1: null }}]);
        // this.router.navigate(['/dashboard']);
    }

    push1() {
        // this.settings.isShow = false
        this.router.navigateByUrl('form');
        // this.router.navigate([{ outlets: { popup: null }}]);
        // this.router.navigate(['/form']);
    }


}

