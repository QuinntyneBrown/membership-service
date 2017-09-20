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

import { AccountsService } from "./accounts.service";

import { AccountEditComponent } from "./account-edit.component";
import { AccountEditPageComponent } from "./account-edit-page.component";
import { AccountListItemComponent } from "./account-list-item.component";
import { AccountPaginatedListComponent } from "./account-paginated-list.component";
import { AccountPaginatedListPageComponent } from "./account-paginated-list-page.component";

export const ACCOUNT_ROUTES: Routes = [{
    path: 'accounts',
    component: AccountPaginatedListPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'accounts/create',
    component: AccountEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
},
{
    path: 'accounts/:id',
    component: AccountEditPageComponent,
    canActivate: [
        TenantGuardService,
        AuthGuardService,
        EventHubConnectionGuardService,
        CurrentUserGuardService
    ]
}];

const declarables = [
    AccountEditComponent,
    AccountEditPageComponent,
    AccountListItemComponent,
    AccountPaginatedListComponent,
    AccountPaginatedListPageComponent
];

const providers = [AccountsService];

@NgModule({
    imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule.forChild(ACCOUNT_ROUTES), SharedModule, UsersModule],
    exports: [declarables],
    declarations: [declarables],
    providers: providers
})
export class AccountsModule { }
