import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { IndoChinsesVendorComponent } from './indo-chinses-vendor/indo-chinses-vendor.component';
import { NorthVendorComponent } from './north-vendor/north-vendor.component';
import { SouthVendorComponent } from './south-vendor/south-vendor.component';
import { LoginComponent} from './login/login.component';
import{VendorDetailsComponent} from './vendor-details/vendor-details.component';
import{EmployeeDetailsComponent} from './employee-details/employee-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Admin', component: AdminComponent},
  {path: 'Employee', component: EmployeeComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'IndoChinese', component: IndoChinsesVendorComponent },
  {path: 'NorthIndian', component: NorthVendorComponent },
  {path: 'SouthIndian', component:SouthVendorComponent },
  {path: 'Login', component:LoginComponent },
  {path: 'VendorDetails', component:VendorDetailsComponent },
  {path: 'EmployeeDetails', component:EmployeeDetailsComponent },
  {path: 'OrderDetails', component: OrderDetailsComponent},
  {path: 'PendingOrder', component: PendingOrdersComponent},
  { path: '**', component: PageNotFoundComponent }
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
