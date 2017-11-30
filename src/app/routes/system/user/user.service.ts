import { Injectable } from '@angular/core';
import { HttpService } from '../../../core/http/http.service'
import { User } from './user.model'
import { Result } from '../../../core/http/result.model'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class UserService {

    constructor(private httpService: HttpService) {
    }

    public getAllUsers(pageIndex, pageSize, name): any {
        return this.httpService.getPage('api/user/list', {name: name}, pageIndex, pageSize).then((res: Result) => {
            return Promise.resolve(res.data);
        }).catch(error => {
            return Promise.reject(error);
        })
    }

    public checkNameIsExist(params): Promise<Result | Object> {
        return this.httpService.get('api/user/checkIsExist', params);
    }

    public save(user): Promise<Result | Object> {
        return this.httpService.post('api/user', user);
    }


    public update(user): Promise<Result | Object> {
        return this.httpService.put('api/user', user);
    }


    public deleteUser(id): Promise<Result | Object> {
        return this.httpService.delete('api/user', {id: id});
    }


}
