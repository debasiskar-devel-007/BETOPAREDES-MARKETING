import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-marketingreview-new',
  templateUrl: './marketingreview-new.component.html',
  styleUrls: ['./marketingreview-new.component.css']
})
export class MarketingreviewNewComponent implements OnInit {

  constructor(public api_service:ApiService,
  public activatedroute: ActivatedRoute,) { }

  ngOnInit() {
  }
  request_contract(){
    console.log(this.activatedroute.snapshot.params);
    let endpoint='https://z2oo2a8oq9.execute-api.us-east-1.amazonaws.com/dev/api/requestcontractfromlead'
let data={
  product_id:this.activatedroute.snapshot.params.product_id,
  lead_id:this.activatedroute.snapshot.params.lead_id,
  rep_id:this.activatedroute.snapshot.params.rep_id
}
this.api_service.requestData(endpoint,data).subscribe((res:any)=>{

})
  }
}
