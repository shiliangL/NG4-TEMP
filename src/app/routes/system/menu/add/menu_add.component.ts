import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { MenuService } from '../menu.service';
import { Menu } from '../menu.model';
import { Operation } from '@myproject/core/enum/operation.enum';
import { Result } from '@myproject/core/http/result.model';

@Component({
    selector: 'menu-add',
    templateUrl: './menu_add.component.html',
    styleUrls: ['./menu_add.component.css'],
    providers: [MenuService]
})
export class MenuAddComponent implements OnInit {

    @Output() onVoted = new EventEmitter();
    @Input() menu: Menu;
    @Input() operation: Operation;

    loading = false;
    validateForm: FormGroup;

    constructor(private menuService: MenuService, private _message: NzMessageService, private fb: FormBuilder) {
    };

    ngOnInit() {
        if (this.operation === Operation.Add) {
            this.validateForm = this.fb.group({
                topName: null,
                name: null,
                ename: null,
                icon: null,
                url: null,
                sort: null,
                status: null,
            });
        } else {
            this.validateForm = this.fb.group({
                topName: null
            });
        }
    }

    submitForm = ($event, value) => {
        $event.preventDefault();
        for (const key in this.validateForm.controls) {
          this.validateForm.controls[key].markAsDirty();
        }
        this.loading = true;
        if (this.operation === Operation.Add) {
            let params = JSON.parse(JSON.stringify(this.menu));
            delete params.topName;
            this.menuService.save(params).then((res: Result) => {

            }).catch(error => {

            });
        }
    }

}