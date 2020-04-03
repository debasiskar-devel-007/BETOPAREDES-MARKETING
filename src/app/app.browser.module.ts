import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {appRoutingProviders, routing} from './route';
import {ModalModule} from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TestresolveService } from './testresolve.service';
import { ApiService } from './api.service';
import { SlotsComponent } from './slots/slots.component';
import { UsersearchPipe } from './search.pipe';
import { SlotviewComponent } from './slotview/slotview.component';
import { OrderBy } from './orderby';
import { AppModule } from './app.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    
    AppRoutingModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    AppModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService,TestresolveService,ApiService],
  bootstrap: [AppComponent]
})
export class AppBrowserModule { }
