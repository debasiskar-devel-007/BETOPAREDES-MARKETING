import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {appRoutingProviders, routing} from './route'; 
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {ModalModule} from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TestresolveService } from './testresolve.service';
import { ApiService } from './api.service';
import { SlotsComponent } from './slots/slots.component';
import { UsersearchPipe } from './search.pipe';
import { SlotviewComponent } from './slotview/slotview.component';
import { OrderBy } from './orderby';
import { CommonModule } from '@angular/common';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgtUniversalModule } from '@ng-toolkit/universal';
// import { DemoMaterialModule } from './material-module';
import { LoaderService } from './loader.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { Router } from '@angular/router';
import { MarketingreviewComponent } from './marketingreview/marketingreview.component';
import { ContractReviewVideoComponent } from './contract-review-video/contract-review-video.component';
import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';

// import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

// import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' - ',
    applicationName: '',
    defaults: {
      title: '',
      description: '',
      'og:image': '',
      'og:type': 'website',
      'og:locale': 'en_US',
      'og:locale:alternate': 'en_US,nl_NL,tr_TR'
    }
  });
}
// export function translateLoaderFactory(httpClient: HttpClient) {
//   return new TranslateHttpLoader(httpClient);
// }

@NgModule({
  declarations: [
    ContractReviewVideoComponent,
    AppComponent,
    UsersearchPipe,
    SlotsComponent,
    SlotviewComponent,
    OrderBy,
    MarketingreviewComponent

  ],
  imports: [
    // TranslateModule.forRoot(
    //   {
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: translateLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }
    // ),
    
    MetaModule.forRoot(
      {
      provide: MetaLoader,
      useFactory: (metaFactory),
      // deps: [TranslateService]
    }
    ),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    routing,
    ReactiveFormsModule,
    FormsModule,
    // ImageCropperModule,
    BsDatepickerModule.forRoot(),
    // TimepickerModule.forRoot(),
    ModalModule.forRoot(),
    // AccordionModule.forRoot(),
    // NgxUploaderModule,
    // CarouselModule.forRoot(),
    // CKEditorModule,
    // ClipboardModule,
    CommonModule,
    TransferHttpCacheModule,
    NgtUniversalModule,
    // DemoMaterialModule,
  ],
  providers: [
    CookieService,TestresolveService,ApiService, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
// export class AppModule { }
export class AppModule {
  constructor(public http: HttpClient, public router: Router) {
  //  this.router.navigateByUrl('/')
  }

}
