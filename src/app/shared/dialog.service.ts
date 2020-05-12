import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { PeopleAddDialog } from '../people/people-add-dialog/people-add-dialog.component';
import { GroupsAddDialog } from '../groups/groups-add-dialog/groups-add-dialog.component';
import { PeopleData } from './people-data';
import { GroupsData } from './groups-data';

// import { CompanyAddDialog } from '../shared/company-add-dialog/company-add-dialog.component';
// import { CompanyData } from '../shared/company-data';
// import { ProductAddDialog } from './product-add-dialog/product-add-dialog.component';
// import { ProductData } from './product-data';
// import { CompanyService } from '../company/company.service';
// import { ProductService } from '../product/product.service';

export interface CompanyData {
    id : number;
    companyName : string;
    productsCount ?: number;
}

type customSize = "sm" | "md" | "lg";

interface size {
    size: customSize;
}

@Injectable()
export class DialogService {

    constructor(public dialog: MatDialog,
        // , private companyService:CompanyService, private productService:ProductService
    ) {

    }

    openPeopleDialog(data : PeopleData, size : size, disableClose : boolean) : void
    {
        let width : string = this.returnWidth(size.size);

        const dialogRef = this.dialog.open(PeopleAddDialog, {
            width: width,
            data: data,
            disableClose: disableClose
        });
        
        dialogRef.afterClosed().subscribe(result => {
      
            if(result !== undefined){
              console.log('Company dialog was closed - Saved Status');
                      
            }
            else{
              console.log('Company dialog was closed - Cancel Status');
            }
            
        });
    }

    openGroupsDialog(data : GroupsData, size : size, disableClose : boolean) : void
    {
        let width : string = this.returnWidth(size.size);

        const dialogRef = this.dialog.open(GroupsAddDialog, {
            width: width,
            data: data,
            disableClose: disableClose
        });
        
        dialogRef.afterClosed().subscribe(result => {
      
            if(result !== undefined){
              console.log('Company dialog was closed - Saved Status');
                      
            }
            else{
              console.log('Company dialog was closed - Cancel Status');
            }
            
        });
    }

    returnWidth(size){
        let width : string;
        switch(size) { 
            case "sm": { 
               width='250px';
               break; 
            } 
            case "md": { 
                width='350px';
               break; 
            } 
            case "lg": { 
                width='450px';
                break; 
             } 
            default: { 
                width='250px';
                break; 
            } 
        } 
        return width;
    }


}
