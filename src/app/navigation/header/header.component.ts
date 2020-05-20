import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  @Output() public sidenavToggle = new EventEmitter();
  private mobileQueryListener: () => void; ngOnInit(): void {}

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.initMobileQuery(changeDetectorRef, media);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  initMobileQuery(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }





}
