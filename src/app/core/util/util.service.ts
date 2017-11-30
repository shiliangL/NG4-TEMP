import { Injectable }     from '@angular/core';

@Injectable()
export class UtilService {

    deepCopy(obj) {
        let result = {}
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key];
            }
        }
        return result;
    }
    
}