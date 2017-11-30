import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Result } from '@myproject/core/http/result.model';
import { HttpService } from '@myproject/core/http/http.service';

import { Menu } from './menu.model'


@Injectable()
export class MenuService {

    constructor(private httpService: HttpService) {
    }

    public getAllMenus(pageIndex, pageSize, name): any {
        return this.httpService.getPage('api/sys/menu/list', {name: name}, pageIndex, pageSize).then((res: Result) => {
            return Promise.resolve(res.data);
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    public save(menu): Promise<Result | Object> {
        return this.httpService.post('api/sys/menu', menu);
    }

}