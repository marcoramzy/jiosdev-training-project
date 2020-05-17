import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { PeopleAddDialogComponent } from '../../people/people-add-dialog/people-add-dialog.component';
import { GroupsAddDialogComponent } from '../../groups/groups-add-dialog/groups-add-dialog.component';
import { PeopleData } from '../models/people-data';
import { GroupsData } from '../models/groups-data';

type customSize = 'sm' | 'md' | 'lg';

interface Size {
    size: customSize;
}

@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog) {
    }

    openDialog(dialogName: string, data: PeopleData | GroupsData, size: Size, disableClose: boolean, editMode: boolean): void
    {
        const width: string = this.returnWidth(size.size);

        if (dialogName === 'people'){
            const dialogRef = this.dialog.open(PeopleAddDialogComponent, {
                width,
                data: {data},
                disableClose
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined){
                  console.log('people dialog was closed - Saved Status');
                }
                else{
                  console.log('people dialog was closed - Cancel Status');
                }
            });
        }
        else if (dialogName === 'groups'){
            const dialogRef = this.dialog.open(PeopleAddDialogComponent, {
                width,
                data: {data},
                disableClose
            });
            dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined){
                  console.log('groups dialog was closed - Saved Status');
                }
                else{
                  console.log('groups dialog was closed - Cancel Status');
                }
            });
        }


    }

    returnWidth(size: customSize){
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
