import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calender-list',
  templateUrl: './calender-list.component.html',
  styleUrls: ['./calender-list.component.scss']
})
export class CalenderListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setupGrid();
  }

  setupGrid() {
      ($('#grid') as any).kendoGrid({
          dataSource: {
              type: `odata`,
              transport: {
                  read: `https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers`
              },
              pageSize: 20
          },
          height: 550,
          groupable: true,
          sortable: true,
          pageable: {
              refresh: true,
              pageSizes: true,
              buttonCount: 5
          },
          columns: [{
              template: `<div class='customer-photo'` +
              `style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/#:data.CustomerID#.jpg);'></div>` +
              `<div class='customer-name'>#: ContactName #</div>`,
              field: `ContactName`,
              title: `Contact Name`,
              width: 240
          }, {
              field: `ContactTitle`,
              title: `Contact Title`
          }, {
              field: `CompanyName`,
              title: `Company Name`
          }, {
              field: `Country`,
              width: 150
          }]
      });
  }

}
