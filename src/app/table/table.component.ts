import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, pluck } from 'rxjs';
import { ApiService } from '../api.service';
import { Datum } from '../user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public data$: Observable<Datum[]> | undefined; 
  totalRecords: number = 200;
  pageNumber: number = 1;

  constructor(private service: ApiService) { }
  
  ngOnInit(): void {
    this.data$ = this.service.getLazyData(1, 10).pipe(pluck('data'));
    }

  loadCustomers(event: LazyLoadEvent) {
    event.first == 0 ? this.pageNumber = 1 : this.pageNumber = (event.first ?? 10) / (event.rows ?? 10) + 1;
    this.data$ = this.service.getLazyData(this.pageNumber, event.rows ?? 10).pipe( pluck('data'));
         }
}
