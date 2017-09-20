import {Component, ChangeDetectorRef, NgZone} from "@angular/core";
import {ProfilesService} from "./profiles.service";
import {Router} from "@angular/router";
import {pluckOut} from "../shared/utilities/pluck-out";
import {EventHub} from "../shared/services/event-hub";
import {Subscription} from "rxjs/Subscription";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./profile-paginated-list-page.component.html",
    styleUrls: ["./profile-paginated-list-page.component.css"],
    selector: "ce-profile-paginated-list-page"   
})
export class ProfilePaginatedListPageComponent {
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _profilesService: ProfilesService,
        private _correlationIdsList: CorrelationIdsList,
        private _eventHub: EventHub,
        private _router: Router,
        private _ngZone: NgZone
    ) {
        this.subscription = this._eventHub.events.subscribe(x => {                  
            if (this._correlationIdsList.hasId(x.payload.correlationId) && x.type == "[Profiles] ProfileAddedOrUpdated") {
                this._ngZone.run(() => {
                    this._profilesService.get().toPromise().then(x => {
                        this.unfilteredProfiles = x.profiles;
                        this.profiles = this.filterTerm != null ? this.filteredProfiles : this.unfilteredProfiles;                        
                    });
                }
            } else if (x.type == "[Profiles] ProfileAddedOrUpdated") {
                
            }
        });      
    }
    
    public async ngOnInit() {
        this.unfilteredProfiles = (await this._profilesService.get().toPromise()).profiles;   
        this.profiles = this.filterTerm != null ? this.filteredProfiles : this.unfilteredProfiles;       
    }

    public tryToDelete($event) {        
        const correlationId = this._correlationIdsList.newId();

        this.unfilteredProfiles = pluckOut({
            items: this.unfilteredProfiles,
            value: $event.detail.profile.id
        });

        this.profiles = this.filterTerm != null ? this.filteredProfiles : this.unfilteredProfiles;
        
        this._profilesService.remove({ profile: $event.detail.profile, correlationId }).subscribe();
    }

    public tryToEdit($event) {
        this._router.navigate(["profiles", $event.detail.profile.id]);
    }

    public handleProfilesFilterKeyUp($event) {
        this.filterTerm = $event.detail.value;
        this.pageNumber = 1;
        this.profiles = this.filterTerm != null ? this.filteredProfiles : this.unfilteredProfiles;        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }

    private subscription: Subscription;
    public _profiles: Array<any> = [];
    public filterTerm: string;
    public pageNumber: number;

    public profiles: Array<any> = [];
    public unfilteredProfiles: Array<any> = [];
    public get filteredProfiles() {
        return this.unfilteredProfiles.filter((x) => x.name.toLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1);
    }
}
