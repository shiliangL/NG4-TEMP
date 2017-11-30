import { Component, OnInit } from '@angular/core'
import { UserService } from '../user.service'
import { NzModalService } from 'ng-zorro-antd';
import { NzMessageService } from 'ng-zorro-antd';
import { Result } from '@myproject/core/http/result.model';
import { User } from '@myproject/routes/system/user/user.model';
import { Operation } from '@myproject/core/enum/operation.enum';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [ UserService ]
})
export class UserComponent implements OnInit {

    updateUser: User;
    childOperation: Operation;

    _value: string;
    isVisible = false;

    _current = 1;
    _pageSize = 10;
    _dataSet = [];
    _loading = true;
    _total = 0;

    constructor(private userService: UserService, private confirmServ: NzModalService, private _message: NzMessageService,) {
    }

    ngOnInit() {
        this.refreshData();
    }

    refreshData(reset = false) {
        if (reset) {
            this._current = 1;
        }
        this._loading = true;
        this.userService.getAllUsers(this._current, this._pageSize, this._value).then(res => {
            this._total = res.totalElements;
            this._dataSet = res.content;
            this._loading = false;
        }).catch(error => {

        });
    }

    clickDeleteUser(id) {
        let self = this;
        this.confirmServ.confirm({
            title: '您是否确认要删除这项内容',
            showConfirmLoading: true,
            onOk() {
                return new Promise((resolve) => {
                    self.userService.deleteUser(id).then((res: Result) => {
                        self.refreshData();
                        self._message.create('success','删除成功');
                        setTimeout(resolve, 100);
                    }).catch(error => {

                    })
                });
            },
            onCancel() {
            }
        });
    }

    clickUpdateUser(user) {
        this.childOperation = Operation.Edit;
        this.updateUser = JSON.parse(JSON.stringify(user));
        this.isVisible = true;
    }

    onListen(data) {
        this.isVisible = false;
        this.refreshData(true);
    }

    clickShowAdd() {
        this.childOperation = Operation.Add;
        this.updateUser = new User();
        this.isVisible = true;
    }

}
