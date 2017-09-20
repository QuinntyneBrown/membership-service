import {Component,Input,Output,EventEmitter} from "@angular/core";

@Component({
    templateUrl: "./profile-list-item.component.html",
    styleUrls: [
        "../../styles/list-item.css",
        "./profile-list-item.component.css"
    ],
    selector: "ce-profile-list-item"
})
export class ProfileListItemComponent {  
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();		
    }
      
    @Input()
    public profile: any = {};
    
    @Output()
    public edit: EventEmitter<any>;

    @Output()
    public delete: EventEmitter<any>;        
}
