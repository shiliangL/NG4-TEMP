import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuService } from '../menu.service'
import { Menu } from '../menu.model'
import { Operation } from '@myproject/core/enum/operation.enum';

@Component({
    selector: 'sys-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    providers: [ MenuService ]
})
export class MenuComponent implements OnInit {

    updateMenu: Menu;
    childOperation: Operation;

    _value: string;
    isVisible = false;
    
    _current = 1;
    _pageSize = 10;
    _dataSet = [];
    _loading = true;
    _total = 0;

    constructor(private menuService: MenuService, private confirmServ: NzModalService, private _message: NzMessageService,) {
    }

    ngOnInit() {
        this.refreshData();
    }

    refreshData(reset = false) {
        if (reset) {
            this._current = 1;
        }
        this._loading = true;
        this.menuService.getAllMenus(this._current, this._pageSize, this._value).then(res => {
            this._total = res.totalElements;
            this._dataSet = res.content;
            this._loading = false;
        }).catch(error => {

        });
    }

    clickShowAdd() {
        this.childOperation = Operation.Add;
        let menu = new Menu();
        menu.level = 1;
        menu.status = 1;
        this.updateMenu = menu;
        this.isVisible = true;
    }

}