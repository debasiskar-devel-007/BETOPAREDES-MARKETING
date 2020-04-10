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
  public allAccordion = [
    [
      {link:'H5vniUgWx4s',module:'Demonstration of different sections on the Admin Dashboard and their functions.', title:'Admin Functionalities', status:true},
      {link:'UGtbX0wjCT8',module:'Demonstration of how Admin can Manage different User roles on Admin Dashboard.'},
      {link:'iIHAiw-j6p4',module:'Demonstration of how Admin can Review a Superbill for any patient on the Admin Dashboard.'},
      {link:'oXJjDyX2SG0',module:'Demonstration of how Admin can Download a Superbill for any patient on the Admin Dashboard.'},
      {link:'Fj5wsHvJwTI',module:'Demonstration of how Admin can Add Patient Reports Manually on the Admin Dashboard.'},
      {link:'NRYN95QvCJA',module:'Demonstration of how Admin can Modify their Account Information and Settings from their Dashboard.'},
      {link:'Yilyx4DfLAk',module:'Demonstration of how Admin can Edit or Delete Specific Patient Reports on the Admin Dashboard.'},
      {link:'07dqeQFCrBU',module:'Demonstration of how Admin can Manage FAQs for Different User Roles on the Admin Dashboard.'}
    ],
    [
      {link:'_NVXEJTfylA',module:'Demonstration of different sections on the Diagnostic Admin Dashboard and their functions.',title:'Diagnostic Admin Functionalities', status:false},
      {link:'nLz2LLNwG1U',module:'Demonstration of how Diagnostic Admin can Modify their Account Information and Settings from their Dashboard.'},
      {link:'tVEabfpZWno',module:'Demonstration of how Diagnostic Admin can Manage a Biller Account from their Dashboard.'},
      {link:'xbVl-lV6txQ',module:'Demonstration of how Diagnostic Admin can Manage a Doctor Account from their Dashboard.'},
      {link:'yHDorFU_w0k',module:'Demonstration of how Diagnostic Admin can Manage a Technician Account from their Dashboard.'},
      {link:'omRWlsLP-V0',module:'Demonstration of how Diagnostic Admin can Add Patient Reports Manually from their Dashboard.'},
      {link:'ORpNkTTmPm8',module:'Demonstration of how Diagnostic Admin can View, Edit or Delete Specific Patient Reports from their Dashboard.'},
      {link:'cfZzEkaouBs',module:'Demonstration of how Diagnostic Admin can Download a Superbill from their Dashboard.'}
    ],
    [
      {link:'d6dubXx4iwU',module:'Demonstration of how Biller can Modify their Account Information and Settings from their Dashboard.',title:'Biller Functionalities', status:false},
      {link:'8DHIP4ohHOg',module:'Demonstration of how Biller can View or Download a Superbill from their Dashboard.'}
    ],
    [
      {link:'P0yudjeLUAU',module:'Demonstration of how a Doctor can Modify their Account Information and Settings from their Dashboard.',title:'Doctor Functionalities', status:false},
      {link:'OdchX6WNETU',module:'Demonstration of different sections on the Doctor Dashboard and their functions.'},
      {link:'VRFv6OuRX2w',module:'Demonstration of how a Doctor can Download a Superbill from their Dashboard.'},
      {link:'8Y0S1Ycou4A',module:'Demonstration of how a Doctor can Manage a Biller Account from their Dashboard.'},
      {link:'Xv9ElHaTSG0',module:"Demonstration of how a Doctor can Manage a Doctor’s Office Account from their Dashboard."},
      {link:'9GMYtQySXLs',module:'Demonstration of how a Doctor can Manage a Technician Account from their Dashboard.'},
      {link:'3dKhQ4SVVNs',module:'Demonstration of how a Doctor can Digitally Sign a Patient Report and Send it Forward to a Biller from their Dashboard.'},
      {link:'_IjVZ_fHtIk',module:'Demonstration of how a Doctor can View a Patient Report from their Dashboard.'}
    ],
    [
      {link:'1aPeaVp5i_Q',module:'Demonstration of different sections on the Technician Dashboard and their functions.',title:'Tech Functionalities', status:false},
      {link:'ABDR98gqBqE',module:'Demonstration of how a Technician can Modify their Account Information and Settings from their Dashboard.'},
      {link:'w3QGBLc0X4g',module:'Demonstration of how a Technician can Upload Patient Reports in Bulk from their Dashboard.'}
    ],
    [
      {link:'1A6SDb4AHfA',module:'Demonstration of how a Doctor registered with a particular Diagnostic Admin can Modify their Account Information and Settings from their Dashboard.', title:"Doctor (Under Diagnostic Admin) Functionalities", status:false},
      {link:'RiUKoYA8k1A',module:'Demonstration of different sections on the Dashboard for a Doctor registered with a particular Diagnostic Admin and their functions.'},
      {link:'zdFLHjnR-PM',module:'Demonstration of how a Doctor registered with a particular Diagnostic Admin can Manage a Doctor’s Office from their Dashboard.'},
      {link:'okowuOUjlak',module:'Demonstration of how a Doctor registered with a particular Diagnostic Admin can View Specific Patient Reports from their Dashboard.'}
    ]
  ]
  // public adminFunctionalities: any = [
  //   {link:'H5vniUgWx4s',module:'Admin Dashboard Walk Through'},
  //   {link:'UGtbX0wjCT8',module:'Admin User Management Function'},
  //   {link:'iIHAiw-j6p4',module:'Admin View or Review Superbill'},
  //   {link:'oXJjDyX2SG0',module:'Admin Download Superbill'},
  //   {link:'Fj5wsHvJwTI',module:'Admin Add Reports Manually'},
  //   {link:'NRYN95QvCJA',module:'Admin Account Settings Modifications'},
  //   {link:'Yilyx4DfLAk',module:'Admin Edit and Delete Report'},
  //   {link:'07dqeQFCrBU',module:'Admin FAQ Management'}
  // ];
  // public diagnosticAdminFunctionalities: any = [
  //   {link:'_NVXEJTfylA',module:'Diagnostic Admin Dashboard Walk Through'},
  //   {link:'nLz2LLNwG1U',module:'Diagnostic Admin Account Settings Management'},
  //   {link:'tVEabfpZWno',module:'Diagnostic Admin Manage Biller Function'},
  //   {link:'xbVl-lV6txQ',module:'Diagnostic Admin Manage Doctor Function'},
  //   {link:'yHDorFU_w0k',module:'Diagnostic Admin Manage Tech Function'},
  //   {link:'omRWlsLP-V0',module:'Diagnostic Admin Add Patient Report Manually Function'},
  //   {link:'ORpNkTTmPm8',module:'Diagnostic Admin View or Edit Patient Report Function'},
  //   {link:'cfZzEkaouBs',module:'Diagnostic Admin Download Superbill Function'}
  // ];
  // public billerFunctionalities: any = [
  //   {link:'d6dubXx4iwU',module:'Biller Account Settings Modification'},
  //   {link:'8DHIP4ohHOg',module:'Biller Dashboard View and Download Bill'}
  // ];
  // public doctorFunctionalities: any = [
  //   {link:'P0yudjeLUAU',module:'Doctor Account Settings Modification'},
  //   {link:'OdchX6WNETU',module:'Doctor Dashboard Walk Through'},
  //   {link:'VRFv6OuRX2w',module:'Doctor Download Superbill'},
  //   {link:'8Y0S1Ycou4A',module:'Doctor Manage Biller Function'},
  //   {link:'Xv9ElHaTSG0',module:"Doctor Manage Doctor's Office Function"},
  //   {link:'9GMYtQySXLs',module:'Doctor Manage Tech Function'},
  //   {link:'3dKhQ4SVVNs',module:'Doctor Sign and Send Patient Report to Biller'},
  //   {link:'_IjVZ_fHtIk',module:'Doctor View Patient Report'}
  // ];
  // public techFunctionalities: any = [
  //   {link:'1aPeaVp5i_Q',module:'Tech Dashboard Walk Through'},
  //   {link:'ABDR98gqBqE',module:'Tech Account Settings Modification'},
  //   {link:'w3QGBLc0X4g',module:'Tech Upload Bulk Reports Function'}
  // ];
  // public doctorUnderDiagnosticAdminFunctionalities: any = [
  //   {link:'1A6SDb4AHfA',module:'Doctor Account Settings Management'},
  //   {link:'RiUKoYA8k1A',module:'Doctor Dashboard Walk Through'},
  //   {link:'zdFLHjnR-PM',module:'Doctor Manage Doctor Office Function'},
  //   {link:'okowuOUjlak',module:'Doctor View Patient Report'}
  // ];
  public youtube_url: any = [
    {'product_id':"5dd68c367b583967f3e57312", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5e4e634052b7254c601f7559", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5d4d5e8cc9e23d43cc124394", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5d4d5f66c9e23d43cc1243a2", 'link':"https://www.youtube.com/embed/b86g1ATb4ok", 'start':0, 'second_start':75},
    {'product_id':"5e4e675185f01a4ee4f0ac22", 'link':"https://www.youtube.com/embed/9mgR4iPsQW0", 'start':0, 'second_start':75},
    {'product_id':"5dd68c367b583967f3e573b2", 'link':"https://www.youtube.com/embed/fnX8ZDfFzD4", 'start':0, 'second_start':175},
  ];
  public discov: boolean = false;
  public modalRef: BsModalRef;
  public modalRef3: BsModalRef;
  public safeSrc:SafeResourceUrl;
  public repData:any = '';
  public dataFormForLead: FormGroup;
  public productval: any;
  public leaddata: any = '';
  public product_id: any= '';
  public pageurl: any = 'https://marketing.betoparedes.com/product-review';
  constructor(public _commonservice: Commonservices, public modal: BsModalService, public _http: HttpClient, public cookeiservice: CookieService, public activatedroute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, public meta: MetaService, public kp: FormBuilder) {
    this.product_id = activatedroute.snapshot.params['product_id'];
    this.meta.setTag('og:type', 'website');
    // for aws
    if (this.activatedroute.snapshot.params['product_id'] == '5dd68c367b583967f3e573b2') {
      this.meta.setTag('og:keyword', 'ANS Testing Management Software, AWS Healthcare Management System, ANS Device and Wellness System');
      this.meta.setTag('twitter:keyword', 'ANS Testing Management Software, AWS Healthcare Management System, ANS Device and Wellness System');
      this.meta.setTitle('Advanced Wellness Solutions');
      this.meta.setTag('og:description', 'The Ultimate Testing And Referral management system for Diagnostic and Imaging Centers, and Physicians in the ANS Medical Industry for “smart” engagement and billing.');
      this.meta.setTag('twitter:description', 'The Ultimate Testing And Referral management system for Diagnostic and Imaging Centers, and Physicians in the ANS Medical Industry for “smart” engagement and billing.');
      this.meta.setTag('og:title', 'Advanced Wellness Solutions');
      this.meta.setTag('twitter:title', 'Advanced Wellness Solutions');
      this.meta.setTag('og:image', 'https://marketing.betoparedes.com/assets/images/aws_600x315.jpg');
      this.meta.setTag('og:image:width', 'auto');
      this.meta.setTag('og:image:height', 'auto');
      this.meta.setTag('twitter:image', 'https://marketing.betoparedes.com/assets/images/aws_1200x 627.jpg');
      if (this.activatedroute.snapshot.params['lead_id'] == null || typeof (this.activatedroute.snapshot.params['lead_id']) != 'undefined') {
        this.meta.setTag('og:url', this.pageurl + '/' + activatedroute.snapshot.params['product_id'] + '/' + this.activatedroute.snapshot.params['rep_id']);
      } else {
        this.meta.setTag('og:url', this.pageurl + '/' + activatedroute.snapshot.params['product_id'] + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id']);
      }
      // console.log(this.pageurl + '/' + activatedroute.snapshot.params['product_id'] + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id'])
    }
    for (const key in this.youtube_url) {
      this.youtube_url[key].safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url[key].link);
    }
   let link = this._commonservice.nodesslurl + 'datalistforleaddata';
   this._http.post(link, {source: 'users_view_rep', condition:{_id_object: this.activatedroute.snapshot.params['rep_id']}}).subscribe((res: any) =>{
     this.repData = res.res[0];
   })
    // 
 }

  ngOnInit() {
console.log(this.allAccordion);
  }
  playVideo(val:any){
    console.log(val)
  }

  startTime(item: any, flag: any){
  if (flag == '1') {
    this.discov = false;
    item.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.link+'?start='+item.start);
  } else if (flag == '3') {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item.link+'?autoplay=1');
    // console.log(this.safeSrc)
    this.discov = true;
  } else {
    this.discov = false;
    item.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.link+'?start='+item.second_start);
  }
  //  console.log(item.safeSrc)
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
                      product: this.leaddata.productname[0].product_name,
                      by: 'lead'
                    }
                      // sourceobj: ['lead_id','rep_id','product_id','created_by']
                  };
                }
                  this._http.post(link1, data).subscribe((res: any) => {
                      // console.log(res);
                      if (res.status == 'success') {
                        this.modalRef3 = this.modal.show(template);
                        this.modalRef.hide();
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
        firstname: [ res.res[0].firstname, Validators.required ],
        lastname: [ res.res[0].lastname, Validators.required ],
        company: [ res.res[0].company, Validators.required ],
        email: [ res.res[0].email, Validators.required ],
        address: [ res.res[0].address, Validators.required ],
        phoneno: [ res.res[0].phoneno, Validators.required ],
        product:[res.res[0].product]
      });
      this.modalRef = this.modal.show(template2);
      });
      }
    }

}
