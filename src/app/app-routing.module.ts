import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterfaceComponent } from './interface/interface.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: 'table', component: TableComponent },
  { path: 'home', component: InterfaceComponent},
  { path: '**', component: InterfaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routComponents = [TableComponent, InterfaceComponent]