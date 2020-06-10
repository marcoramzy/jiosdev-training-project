import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    constructor(public storage: Storage) {
    }


    get(item: string){
        return this.storage.get(item);
        // token
        // church_service_id
        // .then((ChurchServiceId) => {
        //     console.log('ChurchServiceId: ' + ChurchServiceId);
        // });
    }

    set(item: string, value: any){

        console.log('item: ' + item);
        console.log('value: ' + value);

        this.storage.set(item, value);
    }
}
