import { MatDialog } from '@angular/material/dialog';
import { Injectable, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';


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
            console.log('resultttttt', result);
            if (result !== undefined) {
                console.log('dialog was closed - Saved Status');
            }
            else {
                console.log('dialog was closed - Cancel Status');
            }
        });

    }

    openDeleteDialog(
        data: any, size: Size, disableClose: boolean , deleteActionCallback: () => void): void {

        const width: string = this.returnWidth(size.size);
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width,
            data,
            disableClose
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
                deleteActionCallback();
                console.log('delete dialog was closed - Saved Status');
            }
            else {
                console.log('delete dialog was closed - Cancel Status');
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
