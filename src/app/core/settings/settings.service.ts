import { Injectable }     from '@angular/core';
declare var $: any;

@Injectable()
export class SettingsService {

    public layout: any;
    public isShow: boolean;

    constructor() {
        this.layout = {
            isCollapsed: false,
            theme: 'light'
        }
        this.isShow = false
    }

    getLayoutSetting(name) {
        return name ? this.layout[name] : this.layout;
    }

    setLayoutSetting(name, value) {
        if (typeof this.layout[name] !== 'undefined') {
            return this.layout[name] = value;
        }
    }

    toggleLayoutSetting(name) {
        return this.setLayoutSetting(name, !this.getLayoutSetting(name));
    }

}
