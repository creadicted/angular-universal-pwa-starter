import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material';

import { AuthService, AuthenticatedUser } from '../../auth.service';
import { ConfirmDeleteAccountDialog } from './confirm-delete-account.dialog';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'app-account-management',
    templateUrl: './account-management.component.html'
})

export class AccountManagementComponent implements OnInit, OnDestroy {

    destroy: Subject<any> = new Subject();
    user: AuthenticatedUser;
    deleteAccountDialogRef: MatDialogRef<ConfirmDeleteAccountDialog>;
    showChangePassword: boolean = false;

    constructor (public auth: AuthService, public router: Router, public dialog: MatDialog, ) { }

    ngOnInit() {
        this.auth.user$.takeUntil(this.destroy).subscribe(user => {
            if ((user === null) || (this.auth.isAuthenticatedUser(user) && !user.email)) {
                return this.router.navigate(['/']);
            }
            if (this.auth.isAuthenticatedUser(user)) this.user = user;
        })
    }

    logout() {
        this.auth.logout();
    }

    deleteAccountDialog() {
        this.deleteAccountDialogRef = this.dialog.open(ConfirmDeleteAccountDialog, {
            disableClose: false
        });

        this.deleteAccountDialogRef.afterClosed().take(1).subscribe(result => {

            if (result === 'Deleting Account') {
                this.deleteAccount();
            };

        });
    }

    deleteAccount() {
        this.auth.deleteAccount();
    }

    toggleShowChangePassword() {
        this.showChangePassword = !this.showChangePassword;
    }

    ngOnDestroy() {
        this.destroy.next();
    }
}
