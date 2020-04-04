import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commonservices } from '../app.commonservices';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var moment: any;
import { MetaService } from '@ngx-meta/core';
  
@Component({
  selector: 'app-productreview',
  templateUrl: './productreview.component.html',
  styleUrls: ['./productreview.component.css'],
  providers: [Commonservices]
})
export class ProductreviewComponent implements OnInit {
  productReviewData: any = [
    {}
  ]

  public modalRef: BsModalRef;
  public safeSrc:SafeResourceUrl;
  public repData:any = '';
  constructor(public _commonservice: Commonservices, public modal: BsModalService, public _http: HttpClient, public cookeiservice: CookieService, public activatedroute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public meta: MetaService) {
   let link = this._commonservice.nodesslurl + 'datalistforleaddata';
   this._http.post(link, {source: 'users_view_rep', condition:{_id_object: this.activatedroute.snapshot.params['rep_id']}}).subscribe((res: any) =>{
     this.repData = res.res[0];
   })
    // 
 }

  ngOnInit() {

  }
  goTo(val:any){
    if (val == 'contract') {
      this.router.navigateByUrl("/contract-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id']+'/'+ this.activatedroute.snapshot.params['lead_id'])
    } else {
      this.router.navigateByUrl("/marketing-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id']+'/'+ this.activatedroute.snapshot.params['lead_id'])
    }
  }
  sendToCM(template:TemplateRef<any>){
    // console.log(this.activatedroute.snapshot.params['rep_id'], this.activatedroute.snapshot.params['product_id'], this.activatedroute.snapshot.params['lead_id']);
    const link1 = this._commonservice.nodesslurl + 'addorupdatedata';
    let data = {
        source: 'contract_repote',
        data: { status: 'request', rep_id: this.activatedroute.snapshot.params['rep_id'], product_id: this.activatedroute.snapshot.params['product_id'], lead_id:this.activatedroute.snapshot.params['lead_id'], created_by: this.activatedroute.snapshot.params['lead_id']}
    };
    this._http.post(link1, data).subscribe((res: any) => {
        // console.log(res);
        if (res.status == 'success') {
          this.modalRef = this.modal.show(template);
          setTimeout(() => {
            this.modalRef.hide();
          }, 100000);
        }
    });
  }

}
