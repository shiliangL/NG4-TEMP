import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user.service'
import { NzMessageService } from 'ng-zorro-antd';
import { Result } from '@myproject/core/http/result.model';
import { User } from '@myproject/routes/system/user/user.model';
import { Operation } from '@myproject/core/enum/operation.enum';

@Component({
  selector: 'user-add',
  templateUrl: './user_add.component.html',
  styleUrls: ['./user_add.component.css'],
  providers: [ UserService ]
})
export class UserAddComponent implements OnInit {

  @Output() onVoted = new EventEmitter();
  @Input() user: User;
  @Input() operation: Operation;

  loading = false;
  validateForm: FormGroup;
  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
    }
    
    this.loading = true;
    if (this.operation === Operation.Add) {
      let param = { name: value.userName, password: value.password, age: value.age };
      this.userService.save(param).then((res: Result) => {
        this.loading = false;
        this._message.create('success', '添加成功');
        this.onVoted.emit(true);
        this.validateForm.reset();
      }).catch(error => {
        this.loading = false;
        this._message.create('error', '添加失败');      
      });
    } else if (this.operation === Operation.Edit) {
      let param = {id: this.user.id, name: value.userName, age: value.age};
      this.userService.update(param).then((res: Result) => {
        this.loading = false;
        this._message.create('success', '修改成功');
        this.onVoted.emit(true);
        this.validateForm.reset();
      }).catch(error => {
        this.loading = false;
        this._message.create('error', '修改失败');      
      });
    }
  };

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
    }
  }

  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls['passwordConfirmation'].updateValueAndValidity();
    })
  }

  userNameAsyncValidator = (control: FormControl): any => {
    let self = this;
    return Observable.create(function (observer) {
      let params = {name: control.value};
      if (self.operation === Operation.Edit) {
        params['id'] = self.user.id;
      }
      self.userService.checkNameIsExist(params).then((res: Result) => {
        if (res.data) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }).catch(eroor => {
        observer.next(null);
        observer.complete();
      })
    });
  };

  ageValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        let age = Number.parseInt(control.value)
        if (!Number.isInteger(age) || age < 1) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 100);
    });
  };

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
  };

  constructor(private userService: UserService, private _message: NzMessageService, private fb: FormBuilder) {
  };

  ngOnInit() {
    if (this.operation === Operation.Add) {
      this.validateForm = this.fb.group({
        userName: ['', [Validators.required], [this.userNameAsyncValidator]],
        age: ['', [Validators.required], [this.ageValidator]],
        password: ['', [Validators.required]],
        passwordConfirmation: ['', [this.passwordConfirmationValidator]]
      });
    } else {
      this.validateForm = this.fb.group({
        userName: ['', [Validators.required], [this.userNameAsyncValidator]],
        age: ['', [Validators.required], [this.ageValidator]]
      });
    }
  }
}