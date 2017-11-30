import { Injectable } from '@angular/core'
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { RequestMethod } from './method.enum'
import { Result } from './result.model'

import { Observable } from 'rxjs/Observable';

const methods = ['GET','POST','PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'];

@Injectable()
export class HttpService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
         this.initHttpHeaders()
    }

    private initHttpHeaders() {
        this.headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8")
            .set('Accept', 'application/json;charset=utf-8');
    }

    /**
     * 需要登陆后后端返回的令牌
     * @param token
     */
    public setToken(token: string) {
        if (token) {
            this.headers = this.headers.append('Authorization', token);
        }
    }

    post(url, params) {
        return this.request(RequestMethod.Post, url, params);
    }

    put(url, params) {
        return this.request(RequestMethod.Put, url, params);
    }

    get(url, params): Promise<Result | Object> {
         return this.request(RequestMethod.Get, url, this.appendParams(params));
    }

    delete(url, params) : Promise<Result | Object> {
        return this.request(RequestMethod.Delete, url, this.appendParams(params));
    }

    getPage(url, params, pageIndex = 1, pageSize = 10): Promise<Result | Object> {
        let request = this.appendParams(params)
            .set('pageIndex', String(pageIndex))
            .set('pageSize', String(pageSize));
        return this.request(RequestMethod.Get, url, request);
    }

    private appendParams(params): HttpParams{
        let httpParams = new HttpParams();
        if (params && params instanceof Object) {
            for (let key in params) {
                if (key && params[key]) {
                    httpParams = httpParams.set(key, params[key]);
                }
            }
        }
        return httpParams;
    }

    private request(method: RequestMethod, url: string, params: HttpParams): Promise<Result | Object> {
        if (method === RequestMethod.Post || method === RequestMethod.Put) {
            return this.http.request(methods[method], url, {
                headers: this.headers,
                body: params
            }).toPromise().then(this.extractData).catch(this.handleError);
        } else {
            return this.http.request(methods[method], url, {
                headers: this.headers,
                params: params
            }).toPromise().then(this.extractData).catch(this.handleError);
        }
    }

    private extractData(res: Result) {
        if (res.resultCode === 0) {
            
        }
        return res;
    }

    private handleError(error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}
