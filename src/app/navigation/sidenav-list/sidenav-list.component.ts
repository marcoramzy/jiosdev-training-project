import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  CurrentChurchServiceName: string;
  CurrentMemberFullName: string;
  @Output() sidenavClose = new EventEmitter();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getCurrentUserSettings();
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  getCurrentUserSettings(){
    this.authService.getCurrentUserSettings().subscribe(
      (res) => {
        console.log('ResultData', res.ResultData);
        this.CurrentChurchServiceName = res.ResultData.CurrentChurchServiceName;
        this.CurrentMemberFullName = res.ResultData.CurrentMemberFullName;
      }
    );
  }

}
