import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from './services/storage.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    StorageService
  ]
})
export class CoreModule {}

