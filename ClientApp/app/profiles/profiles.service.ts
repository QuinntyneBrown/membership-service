import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Profile } from "./profile.model";
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../shared/services/error.service";

@Injectable()
export class ProfilesService {
    constructor(
        private _errorService: ErrorService,
        private _httpClient: HttpClient)
    { }

    public addOrUpdate(options: { profile: Profile, correlationId: string }) {
        return this._httpClient
            .post(`${this._baseUrl}/api/profiles/add`, options)
            .catch(this._errorService.catchErrorResponse);
    }

    public get(): Observable<{ profiles: Array<Profile> }> {
        return this._httpClient
            .get<{ profiles: Array<Profile> }>(`${this._baseUrl}/api/profiles/get`)
            .catch(this._errorService.catchErrorResponse);
    }

    public getById(options: { id: number }): Observable<{ profile:Profile}> {
        return this._httpClient
            .get<{profile: Profile}>(`${this._baseUrl}/api/profiles/getById?id=${options.id}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public remove(options: { profile: Profile, correlationId: string }) {
        return this._httpClient
            .delete(`${this._baseUrl}/api/profiles/remove?id=${options.profile.id}&correlationId=${options.correlationId}`)
            .catch(this._errorService.catchErrorResponse);
    }

    public get _baseUrl() { return ""; }
}
