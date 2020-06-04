import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender/calender.service';
import { ServiceInfoData } from '../shared/models/service-info-data';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  serviceInfo: ServiceInfoData;
  serviceName: string;
  servicePhotoPath: string;
  baseUrl = `${environment.baseUrl}`;

  constructor( private calenderService: CalenderService ) { }

  ngOnInit(): void {
    this.getServiceInformation();
  }

  getServiceInformation(){
    this.calenderService.getServiceInformation().subscribe((res) => {
      this.serviceInfo = res;
      this.serviceName = this.serviceInfo.ServiceName;
      this.servicePhotoPath = this.baseUrl + this.serviceInfo.ServicePhotoPath;
    });

  }

}
