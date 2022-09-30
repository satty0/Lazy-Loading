import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { ApiService } from '../api.service';
// import { User } from '../user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public data$: Observable<any> | undefined; // need to work on <any> -----> <User>
  loading: boolean = true;
  totalRecords: number = 200;
  pageNumber: number = 1;

  constructor(private service: ApiService) { }
  
  ngOnInit(): void {
    this.data$ = this.service.getLazyData(1, 10).pipe(map(res => {
      this.totalRecords = res.totalPassengers ?? 0;
      return res.data
    }))
    this.loading = true;
  }

  //for lazy loading 
  loadCustomers(event: LazyLoadEvent) {
    this.loading = true;
    event.first == 0 ? this.pageNumber = 1 : this.pageNumber = (event.first ?? 10) / (event.rows ?? 10) + 1;
    this.data$ = this.service.getLazyData(this.pageNumber, event.rows ?? 10).pipe(
      map(res => {
        this.totalRecords = res.totalPassengers;
        this.loading = false;
        return res.data;
      })
    )
  }
}
