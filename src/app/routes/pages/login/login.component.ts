import { Component, OnInit, enableProdMode } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
enableProdMode()
@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [FormBuilder, NzMessageService]
})
export class LoginComponent implements OnInit {
    validateForm: FormGroup
    isLoading = false
    loginText = '登录'
    header: Headers

    /**
     * 表单提交
     * @private
     */
    _submitForm() {
        if(this.validateForm.valid){
            this.isLoading = true
            this.loginText = '登录中..'
            let self = this
            this.http.post('/api/user/login', this.validateForm.value, {headers: this.header}).toPromise().then(res => {
                setTimeout(() => {
                    self._message.create('success', '登录成功')
                    self.resetLogin()
                    localStorage.setItem('token', 'qwidejqwioeu1290eu423djewqdjmasdkas;')
                    self.router.navigate([''])
                }, 1000)
            }).catch(error => {
                self.resetLogin()
            });
        } else {
            for (const i in this.validateForm.controls) {
                this.validateForm.controls[ i ].markAsDirty()
            }
        }
    }

    resetLogin() {
        this.isLoading = false
        this.loginText = '登录'
    }

    constructor(private _message: NzMessageService, private fb: FormBuilder, private http: Http, private router: Router) {}

    ngOnInit() {
        /* 设置表单验证字段，包括规则 */
        this.validateForm = this.fb.group({
            userName: [ null, [ Validators.required ] ],
            password: [ null, [ Validators.required ] ],
            remember: [ true ]
        })
        this.header = new Headers({'Content-Type': 'application/json'})
    }
}
