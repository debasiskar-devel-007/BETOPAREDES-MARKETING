/**
 * Created by INFLUXIQ-05 on 31-10-2018.
 */


import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestresolveService } from './testresolve.service';
import { SlotviewComponent } from "./slotview/slotview.component";
import { MarketingreviewComponent } from './marketingreview/marketingreview.component';
import { ContractReviewVideoComponent } from './contract-review-video/contract-review-video.component';
const appRoutes: Routes = [
    { path: '', redirectTo:'/login', pathMatch: 'full' },
    { path: 'slotview', component: SlotviewComponent},
    { path: 'on-boarding-call/:id', component: SlotviewComponent },
    { path: 'customevents/:slotval', component: SlotviewComponent },
    { path: 'customevent', component: SlotviewComponent }, 
    { path: 'customevent/:slot', component: SlotviewComponent }, 
    { path: 'discovery-call/:id', component: SlotviewComponent },
    { path: 'book-a-closer/:id', component: SlotviewComponent },
    { path: 'book-a-closer/:leadid/:pid', component: SlotviewComponent },
    { path: 'book-a-closer', component: SlotviewComponent },
    { path: 'question-and-answer-call/:id', component: SlotviewComponent },

    { path: 'slotview/:id', component: SlotviewComponent },
    // {path: 'marketingre_view/:product_id/:rep_id', component: MarketingreviewComponent, resolve : {results: TestresolveService},data: { requestcondition: {condition: {"rep_id":'rep_id'}}, endpoint: 'datalistforslot'}},
    {path: 'contract-review/:product_id/:rep_id/:lead_id', component: ContractReviewVideoComponent},
    {path: 'contract-review/:product_id/:rep_id', component: ContractReviewVideoComponent},
    // {path: 'contract-review/:product_id/:rep_id/:lead_id', component: ContractReviewVideoComponent, resolve : {results: TestresolveService},data: { requestcondition: {condition: {"_id":'lead_id'}}, endpoint: 'datalistfornewlead'}},

    {path: 'marketing-review/:product_id/:rep_id/:lead_id', component: MarketingreviewComponent},
    {path: 'marketing-review/:product_id/:rep_id', component: MarketingreviewComponent},

    // {path: 'marketing-review/:product_id/:rep_id/:lead_id/:flag', component: MarketingreviewComponent},
    // {path: 'marketing-review/:product_id/:rep_id/:lead_id', component: MarketingreviewComponent, resolve : {results: TestresolveService},data: { requestcondition: {condition: {"_id":'lead_id'}}, endpoint: 'datalistfornewlead'}},



    

    
   


];

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });

