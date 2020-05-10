import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component,OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
  }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
