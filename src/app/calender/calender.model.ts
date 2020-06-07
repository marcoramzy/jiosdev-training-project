import { environment } from 'src/environments/environment';
import { ServiceInfoData } from '../shared/models/service-info-data';


export class AppCalenderModel {
    serviceInfo: ServiceInfoData;
    serviceName: string;
    servicePhotoPath: string;
    baseUrl = `${environment.baseUrl}`;

}
