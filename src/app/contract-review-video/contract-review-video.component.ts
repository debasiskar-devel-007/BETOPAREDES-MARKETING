import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commonservices } from '../app.commonservices';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
declare var moment: any;

@Component({
  selector: 'app-contract-review-video',
  templateUrl: './contract-review-video.component.html',
  styleUrls: ['./contract-review-video.component.css'],
  providers: [Commonservices]
})
export class ContractReviewVideoComponent implements OnInit {

  public modalRef: BsModalRef;
  public modalRef3: BsModalRef;
  public timezoneval:any;
  public filterval5:any;
  public product_id: any = '';
  public allslots: any;
  public allslotslength: any;
  public timezone: any = '';
  public leadData: any = '';
  public lead_id: any = '';
  public rep_data: any = '';
  public lead_data: any = '';
  public youtube_url: any = [
    {'product_id':"5d4d5e8cc9e23d43cc124394", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5e4e675185f01a4ee4f0ac22", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5d4d5eedc9e23d43cc124395", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5d4d5f66c9e23d43cc1243a2", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5e4e634052b7254c601f7559", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5dd68c367b583967f3e573b2", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':175},
  ]
  public safeSrc:SafeResourceUrl;
  public dataFormForLead: FormGroup;
  public productval: any;
  public leaddata: any = '';
  constructor(public _commonservice: Commonservices, public modal: BsModalService, public _http: HttpClient, public cookeiservice: CookieService, public activatedroute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public kp: FormBuilder) { 
    for (const key in this.youtube_url) {
      this.youtube_url[key].safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url[key].link);
    }

  if (activatedroute.snapshot.params['lead_id'] != null) {
    this.lead_id = activatedroute.snapshot.params['lead_id'];
  //   this.activatedroute.data.forEach((data:any ) => {
  //     this.leadData = data.results.res;
  //     console.log(this.leadData)
  //  });
   }

    this.product_id = activatedroute.snapshot.params['product_id'];
    this._http.get("assets/data/timezone.json")
          .subscribe((res:any) => {
              this.timezone=res;
              this.timezoneval=this.cookeiservice.get('timezone');
          }, error => {
              console.log('Oooops!');
          });

  }

  startTime(item: any, flag: any){
    // console.log(item)
  //   this.youtube_url[key].safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url[key].link);
  if (flag == '1') {
    item.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.link+'?start='+item.start+'?autoplay=1');
  } else {
    item.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.link+'?start='+item.second_start+'?autoplay=1');
  }
  //  console.log(item.safeSrc)
  }

  geteventarr() {
    let cond: any;
    if (this.filterval5 != null && this.filterval5 != '') {
      cond = {
        "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [this.product_id] }, slots: { $type: 'array' }, startdate: {
          $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
          $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
        }
      };
    } else {
      cond = {
        "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [this.product_id] }, slots: { $type: 'array' }, startdate: {
          $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
          $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
        }
      };
      // console.log('cond', cond);
    }
    const link = this._commonservice.nodesslurl + 'datalistforslot';
    this._http.post(link, {rep_id: this.activatedroute.snapshot.params['rep_id'],lead_id: this.activatedroute.snapshot.params['lead_id'], condition: cond }).subscribe((res:any) => {
      this.allslots = res.res;
      this.allslotslength = res.data.slots_data.length;
      this.lead_data = res.data.lead_data[0].emailStatus;
      if (this.lead_data.emailStatus == 'send') {
        // console.log('++++++')
        const link1 = this._commonservice.nodesslurl + 'addorupdatedata';
              let data = {
                  source: 'leads',
                  data: { id: this.lead_data._id, emailStatus: 'seen' }
              };
              this._http.post(link1, data).subscribe((res1: any) => {
                  // console.log(res1, '+++res1');
              });
      }
      // console.log('allslots', this.allslots, this.allslots.length);
    });
  }


  ngOnInit() {
    this.slotview();
  }

  goTo(val:any){
    if (val == 'marketing') {
      if (typeof(this.activatedroute.snapshot.params['lead_id']) == 'undefined' || this.activatedroute.snapshot.params['lead_id'] == null) {
        this.router.navigateByUrl("/marketing-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id'])
      }else{
        this.router.navigateByUrl("/marketing-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id']+'/'+ this.activatedroute.snapshot.params['lead_id'])
      }
    } else {
      if (typeof(this.activatedroute.snapshot.params['lead_id']) == 'undefined' || this.activatedroute.snapshot.params['lead_id'] == null) {
      this.router.navigateByUrl("/product-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id'])
      }else{
        this.router.navigateByUrl("/product-review/"+ this.activatedroute.snapshot.params['product_id']+'/'+this.activatedroute.snapshot.params['rep_id']+'/'+ this.activatedroute.snapshot.params['lead_id'])
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
  slotview(){
    let cond = { "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [this.product_id]}, slots:{$type:'array'}, startdate:{
      $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
      $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
  }};

  const link = this._commonservice.nodesslurl + 'datalistforslot';
        this._http.post(link,{rep_id: this.activatedroute.snapshot.params['rep_id'],lead_id: this.activatedroute.snapshot.params['lead_id'],condition:cond}).subscribe((res:any) => {
            this.allslots = res.res;
            this.allslotslength = res.resc;
            this.rep_data = res.data.rep_data[0];
            this.lead_data = res.data.lead_data[0];
            if (this.lead_data.emailStatus == 'send') {
              const link1 = this._commonservice.nodesslurl + 'addorupdatedata';
                    let data = {
                        source: 'leads',
                        data: { id: this.lead_data._id, emailStatus: 'seen' }
                    };
                    this._http.post(link1, data).subscribe((res1: any) => {
                      if (res1.status == 'success') {
                        
                      }
                    });
            }
            // console.log('allslots',this.allslots,this.allslots.length);
        });
  }
}
