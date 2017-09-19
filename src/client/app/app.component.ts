import { Component } from '@angular/core';
import {Auth} from './services/auth/auth.service';

@Component({
    moduleId:module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent { 
    constructor(private auth: Auth){
        
    }
}
