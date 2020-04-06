import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commonservices } from '../app.commonservices';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var moment: any;
import { MetaService } from '@ngx-meta/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
  
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
  public modalRef3: BsModalRef;
  public safeSrc:SafeResourceUrl;
  public repData:any = '';
  public dataFormForLead: FormGroup;
  public productval: any;
  public leaddata: any = '';
  constructor(public _commonservice: Commonservices, public modal: BsModalService, public _http: HttpClient, public cookeiservice: CookieService, public activatedroute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public meta: MetaService, public kp: FormBuilder) {
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
      if (typeof(this.activatedroute.snapshot.params['lead_id']) == 'undefined' || this.activatedroute.snapshot.params['lead_id'] == null) {
        this.router.navigateByUrl("/contract-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id'])
      }else{
        this.router.navigateByUrl("/contract-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id']+'/'+ this.activatedroute.snapshot.params['lead_id'])
      }
    } else {
      if (typeof(this.activatedroute.snapshot.params['lead_id']) == 'undefined' || this.activatedroute.snapshot.params['lead_id'] == null) {
        this.router.navigateByUrl("/marketing-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id'])
      }else{
        this.router.navigateByUrl("/marketing-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id']+'/'+ this.activatedroute.snapshot.params['lead_id'])
      }
    }
  }
  
  dosubmitForLead(template:TemplateRef<any>){
    let y: any;
      for (y in this.dataFormForLead.controls) {
          this.dataFormForLead.controls[y].markAsTouched();
      }
      if(this.dataFormForLead.valid){
      const link = this._commonservice.nodesslurl + 'addorupdatedata';
      this.dataFormForLead.value.id = this.leaddata._id;
          this._http.post(link, { source: 'leads', data: this.dataFormForLead.value, sourceobj: ['created_by']  })
              .subscribe((res:any) => {
                if(res.status == 'success'){
                  let data;
                  const link1 = this._commonservice.nodesslurl + 'addorupdatedata';
                  if (this.activatedroute.snapshot.params['lead_id'] == null) {
                    data = {
                      source: 'contract_repote',
                      data: { status: 'request', rep_id: this.activatedroute.snapshot.params['rep_id'], product_id: this.activatedroute.snapshot.params['product_id'], lead_id:res.res, created_by: res.res,
                      product: this.productval[0].productname,
                      by: 'lead'}
                      // sourceobj: ['lead_id','rep_id','product_id','created_by']
                  };
                  } else {
                  data = {
                      source: 'contract_repote',
                      data: { status: 'request', rep_id: this.activatedroute.snapshot.params['rep_id'], product_id: this.activatedroute.snapshot.params['product_id'], lead_id:this.activatedroute.snapshot.params['lead_id'],
                      created_by: this.activatedroute.snapshot.params['lead_id'],
                      product: this.productval[0].productname,
                      by: 'lead'
                    }
                      // sourceobj: ['lead_id','rep_id','product_id','created_by']
                  };
                }
                  this._http.post(link1, data).subscribe((res: any) => {
                      // console.log(res);
                      if (res.status == 'success') {
                        this.modalRef3 = this.modal.show(template);
                        setTimeout(() => {
                          this.modalRef3.hide();
                        }, 100000);
                      }
                  });
                }
              });
            }
    
    }
    sendToCM( template2:TemplateRef<any>){
      if (typeof(this.activatedroute.snapshot.params['lead_id']) == 'undefined' || this.activatedroute.snapshot.params['lead_id'] == null) {
      const link1 = this._commonservice.nodesslurl + 'datalistforleaddata';
      this._http.post(link1, { source:'products_name', condition: { _id_object: this.activatedroute.snapshot.params['product_id'] }}).subscribe((res:any) => {
        this.productval = res.res;
      this.dataFormForLead = this.kp.group({
        firstname: [ '', Validators.required ],
        lastname: [ '', Validators.required ],
        company: [ '', Validators.required ],
        email: [ '', Validators.required ],
        address: [ '', Validators.required ],
        phoneno: [ '', Validators.required ],
        product:[res.res[0]._id]
      });
      this.modalRef = this.modal.show(template2);
      });
      }
       else {
      const link1 = this._commonservice.nodesslurl + 'datalistforleaddata';
      this._http.post(link1, { source:'leads_view', condition: { _id_object: this.activatedroute.snapshot.params['lead_id'] }}).subscribe((res:any) => {
        this.leaddata = res.res[0];
      this.dataFormForLead = this.kp.group({
        firstname: [ '', Validators.required ],
        lastname: [ '', Validators.required ],
        company: [ '', Validators.required ],
        email: [ res.res[0].email, Validators.required ],
        address: [ '', Validators.required ],
        phoneno: [ '', Validators.required ],
        product:[res.res[0].product]
      });
      this.modalRef = this.modal.show(template2);
      });
      }
    }

}
