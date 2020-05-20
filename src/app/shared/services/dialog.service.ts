import { MatDialog } from '@angular/material/dialog';
import { Injectable, TemplateRef } from '@angular/core';

import { PeopleAddDialogComponent } from '../../people/people-add-dialog/people-add-dialog.component';
import { GroupsAddDialogComponent } from '../../groups/groups-add-dialog/groups-add-dialog.component';
import { PeopleData } from '../models/people-data';
import { GroupsData } from '../models/groups-data';
import { GroupsDeleteDialogComponent } from 'src/app/groups/groups-delete-dialog/groups-delete-dialog.component';
import { PeopleDeleteDialogComponent } from 'src/app/people/people-delete-dialog/people-delete-dialog.component';
import { PeopleViewDialogComponent } from 'src/app/people/people-view-dialog/people-view-dialog.component';
import { GroupsViewDialogComponent } from 'src/app/groups/groups-view-dialog/groups-view-dialog.component';
import { ComponentType } from '@angular/cdk/portal';

type customSize = 'sm' | 'md' | 'lg';

interface Size {
    size: customSize;
}

@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog) {
    }

    openDialog(
        dialogComponent: ComponentType<any> | TemplateRef<any>,
        data: any, size: Size, disableClose: boolean): void {

        const width: string = this.returnWidth(size.size);
        const dialogRef = this.dialog.open(dialogComponent, {
            width,
            data,
            disableClose
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                console.log('dialog was closed - Saved Status');
            }
            else {
                console.log('dialog was closed - Cancel Status');
            }
        });

    }


    returnWidth(size: customSize) {
        let width: string;
        switch (size) {
            case 'sm': {
                width = '250px';
                break;
            }
            case 'md': {
                width = '350px';
                break;
            }
            case 'lg': {
                width = '450px';
                break;
            }
            default: {
                width = '250px';
                break;
            }
        }
        return width;
    }


}
