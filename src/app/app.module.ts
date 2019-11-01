import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards';

import { AdminComponent } from './admin/admin.component';
import { EmployeeComponent } from './employee/employee.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SouthVendorComponent } from './south-vendor/south-vendor.component';
import { IndoChinsesVendorComponent } from './indo-chinses-vendor/indo-chinses-vendor.component';
import { NorthVendorComponent } from './north-vendor/north-vendor.component';
import { LoginComponent } from './login/login.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { JwtInterceptor } from './interceptors';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,   
    AdminComponent,
    EmployeeComponent,
    HeaderComponent,
    FooterComponent,
    SouthVendorComponent,
    IndoChinsesVendorComponent,
    NorthVendorComponent,
    LoginComponent,
    VendorDetailsComponent,
    EmployeeDetailsComponent,
    OrderDetailsComponent,
    PendingOrdersComponent,
    PageNotFoundComponent,
    CartComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
