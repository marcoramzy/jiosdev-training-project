import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender/calender.service';
import { AppCalenderModel } from './calender.model';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {

  model: AppCalenderModel;

  constructor( private calenderService: CalenderService ) { }

  ngOnInit(): void {
    this.initModel();
    this.getServiceInformation();
  }

  getServiceInformation(){
    this.calenderService.getServiceInformation().subscribe((res) => {
      this.model.serviceInfo = res;
      this.model.serviceName = this.model.serviceInfo.ServiceName;
      this.model.servicePhotoPath = this.model.baseUrl + this.model.serviceInfo.ServicePhotoPath;
    });

  }

  private initModel() {
    this.model = new AppCalenderModel();
  }

}
