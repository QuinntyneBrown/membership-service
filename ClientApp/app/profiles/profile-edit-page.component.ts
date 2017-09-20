import {Component} from "@angular/core";
import {ProfilesService} from "./profiles.service";
import {Router,ActivatedRoute} from "@angular/router";
import {guid} from "../shared/utilities/guid";
import {CorrelationIdsList} from "../shared/services/correlation-ids-list";

@Component({
    templateUrl: "./profile-edit-page.component.html",
    styleUrls: ["./profile-edit-page.component.css"],
    selector: "ce-profile-edit-page"
})
export class ProfileEditPageComponent {
    constructor(private _profilesService: ProfilesService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _correlationIdsList: CorrelationIdsList
    ) { }

    public async ngOnInit() {
        if (this._activatedRoute.snapshot.params["id"]) {            
            this.profile = (await this._profilesService.getById({ id: this._activatedRoute.snapshot.params["id"] }).toPromise()).profile;
        }
    }

    public tryToSave($event) {
        const correlationId = this._correlationIdsList.newId();
        this._profilesService.addOrUpdate({ profile: $event.detail.profile, correlationId }).subscribe();
        this._router.navigateByUrl("/profiles");
    }

    public profile = {};
}
