import { NgModule } from '@angular/core';
import { DialogService } from './shared/dialog.service';
import { PeopleService } from './people/people.service';
import { GroupsService } from './groups/groups.service';

@NgModule({
  providers: [
    DialogService,
    PeopleService,
    GroupsService
    
  ]
})
export class CoreModule {}

