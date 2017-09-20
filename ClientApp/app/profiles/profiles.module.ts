import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { UsersModule } from "../users/users.module";

import { AuthGuardService } from "../shared/guards/auth-guard.service";
import { TenantGuardService } from "../shared/guards/tenant-guard.service";
import { EventHubConnectionGuardService } from "../shared/guards/event-hub-connection-guard.service";
import { CurrentUserGuardService } from "../users/current-user-guard.service";

import { ProfilesService } from "./profiles.service";

import { ProfileEditComponent } from "./profile-edit.component";
import { ProfileEditPageComponent } from "./profile-edit-page.component";
import { ProfileListItemComponent } from "./profile-list-item.component";
import { ProfilePaginatedListComponent } from "./profile-paginated-list.component";
import { ProfilePaginatedListPageComponent } from "./profile-paginated-list-page.component";

export const PROFILE_ROUTES: Routes = [{
    path: 'profiles',
    component: ProfilePaginatedListPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'profiles/create',
    component: ProfileEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'profiles/:id',
    component: ProfileEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
}];

const declarables = [
    ProfileEditComponent,
    ProfileEditPageComponent,
    ProfileListItemComponent,
    ProfilePaginatedListComponent,
    ProfilePaginatedListPageComponent
];

const providers = [ProfilesService];

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(PROFILE_ROUTES), SharedModule, UsersModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class ProfilesModule { }
