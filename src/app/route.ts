/**
 * Created by INFLUXIQ-05 on 31-10-2018.
 */


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestresolveService } from './testresolve.service';
import { MarketingreviewComponent } from './marketingreview/marketingreview.component';
import { ContractReviewVideoComponent } from './contract-review-video/contract-review-video.component';
import { ProductreviewComponent } from './productreview/productreview.component';
import { TempaccessComponent } from './tempaccess/tempaccess.component';
import { MarketingreviewNewComponent } from './marketingreview-new/marketingreview-new.component';



const appRoutes: Routes = [
    { path: 'on-boarding-call-booked/:userId/:googleEventId', component: TempaccessComponent},
    // {path: 'marketingre_view/:product_id/:rep_id', component: MarketingreviewComponent, resolve : {results: TestresolveService},data: { requestcondition: {condition: {"rep_id":'rep_id'}}, endpoint: 'datalistforslot'}},
    {path: 'contract-review/:product_id/:rep_id/:lead_id', component: ContractReviewVideoComponent},
    {path: 'contract-review/:product_id/:rep_id', component: ContractReviewVideoComponent},
    // {path: 'contract-review/:product_id/:rep_id/:lead_id', component: ContractReviewVideoComponent, resolve : {results: TestresolveService},data: { requestcondition: {condition: {"_id":'lead_id'}}, endpoint: 'datalistfornewlead'}},

    {path: 'marketing-review/:product_id/:rep_id/:lead_id', component: MarketingreviewComponent},
    {path: 'marketing-review/:product_id/:rep_id', component: MarketingreviewComponent},

    { path: 'product-review/:product_id/:rep_id/:lead_id', component: ProductreviewComponent},
    { path: 'product-review/:product_id/:rep_id', component: ProductreviewComponent},

    { path: 'marketing-review-new/:product_id/:rep_id/:lead_id', component: MarketingreviewNewComponent}
];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
