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
  selector: 'app-marketingreview',
  templateUrl: './marketingreview.component.html',
  styleUrls: ['./marketingreview.component.css'],
  providers: [Commonservices]
})
export class MarketingreviewComponent implements OnInit {
  public today = new Date();
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
  public discov: boolean = false;
  public youtubeVideoUrl: any = '';
  modalRef3: BsModalRef;
  public leadflag: any = 0;
  public pageurl: any = ' https://backoffice.betoparedes.com/marketing-review';
  public loading:boolean = false;
  public youtube_url: any = [
    {'product_id':"5dd68c367b583967f3e57312", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5e4e634052b7254c601f7559", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5d4d5e8cc9e23d43cc124394", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5d4d5f66c9e23d43cc1243a2", 'link':"https://www.youtube.com/embed/b86g1ATb4ok", 'start':0, 'second_start':75},
    {'product_id':"5e4e675185f01a4ee4f0ac22", 'link':"https://www.youtube.com/embed/9mgR4iPsQW0", 'start':0, 'second_start':75},
    {'product_id':"5dd68c367b583967f3e573b2", 'link':"https://www.youtube.com/embed/fnX8ZDfFzD4", 'start':0, 'second_start':175},
  ]
  public safeSrc:SafeResourceUrl;
  constructor(public _commonservice: Commonservices, public modal: BsModalService, public _http: HttpClient, public cookeiservice: CookieService, public activatedroute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer, private readonly meta: MetaService) {

    

    for (const key in this.youtube_url) {
      this.youtube_url[key].safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url[key].link);
    }
    // if (activatedroute.snapshot.params['lead_id'] != null) {
    //   this.lead_id = activatedroute.snapshot.params['lead_id'];
    //   this.activatedroute.data.forEach((data: any) => {
    //     this.leadData = data.results.res;
    //     console.log(this.leadData)
    //   });
    // }
    this.product_id = activatedroute.snapshot.params['product_id'];
    this._http.get("assets/data/timezone.json")
          .subscribe((res:any) => {
              this.timezone=res;
              this.timezoneval=this.cookeiservice.get('timezone');
          }, error => {
              console.log('Oooops!');
          });

    // console.log(this.product_id)
   }


  ngOnInit() {
    this.slotview();

    this.meta.setTag('og:type', 'website');
    // for aws
    // if (this.activatedroute.snapshot.params['product_id'] == '5dd68c367b583967f3e573b2') {
      this.meta.setTag('og:keyword', 'ANS Testing Management Software, AWS Healthcare Management System, ANS Device and Wellness System');
      this.meta.setTag('twitter:keyword', 'ANS Testing Management Software, AWS Healthcare Management System, ANS Device and Wellness System');
      this.meta.setTitle('Advanced Wellness Solutions');
      this.meta.setTag('og:description', 'The Ultimate Testing And Referral management system for Diagnostic and Imaging Centers, and Physicians in the ANS Medical Industry for “smart” engagement and billing.');
      this.meta.setTag('twitter:description', 'The Ultimate Testing And Referral management system for Diagnostic and Imaging Centers, and Physicians in the ANS Medical Industry for “smart” engagement and billing.');
      this.meta.setTag('og:title', 'Advanced Wellness Solutions');
      this.meta.setTag('twitter:title', 'Advanced Wellness Solutions');
      this.meta.setTag('og:image', '../../assets/images/marketingre_view_awslogo.png');
      this.meta.setTag('twitter:image', '../../assets/images/marketingre_view_awslogo.png');
      if (this.activatedroute.snapshot.params['lead_id'] == null || typeof (this.activatedroute.snapshot.params['lead_id']) != 'undefined') {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id']);
      } else {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id']);
      }
      console.log(this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id'])
    // }
    // for uta  
    if (this.product_id == '5d4d5e8cc9e23d43cc124394') {
      this.meta.setTag('og:keyword', 'Global Technology Partner, Global Technology Partnerships, Global Technology Solutions');
      this.meta.setTag('twitter:keyword', 'Global Technology Partner, Global Technology Partnerships, Global Technology Solutions');
      this.meta.setTitle('Universal Tech Associates');
      this.meta.setTag('og:description', 'Bringing emerging technologies to a massive vertical in the global marketplace, while also specializing in global technology, data, and other marketing initiatives all around the world.');
      this.meta.setTag('twitter:description', 'Bringing emerging technologies to a massive vertical in the global marketplace, while also specializing in global technology, data, and other marketing initiatives all around the world.');
      this.meta.setTag('og:title', 'Universal Tech Associates');
      this.meta.setTag('twitter:title', 'Universal Tech Associates');
      this.meta.setTag('og:image', '../../assets/images/uta_marketingre_view_logo.png');
      this.meta.setTag('twitter:image', '../../assets/images/uta_marketingre_view_logo.png');
      if (this.activatedroute.snapshot.params['lead_id'] == null || typeof (this.activatedroute.snapshot.params['lead_id']) != 'undefined') {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id']);
      } else {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id']);
      }
    }
    // for apogee
    if (this.product_id == '5d4d5eedc9e23d43cc124395') {
      this.meta.setTag('og:keyword', 'Ecommerce Technology Solutions, Marketing Technology Solutions, Customized Technological Innovations');
      this.meta.setTag('twitter:keyword', 'Ecommerce Technology Solutions, Marketing Technology Solutions, Customized Technological Innovations');
      this.meta.setTitle('ApogeeINVENT');
      this.meta.setTag('og:description', 'Providing Ecommerce and marketing technology solutions to businesses around the world for over 15 years, focusing on offering technological innovation and outstanding customer service.');
      this.meta.setTag('twitter:description', 'Providing Ecommerce and marketing technology solutions to businesses around the world for over 15 years, focusing on offering technological innovation and outstanding customer service.');
      this.meta.setTag('og:title', 'ApogeeINVENT');
      this.meta.setTag('twitter:title', 'ApogeeINVENT');
      this.meta.setTag('og:image', '../../assets/images/ApogeeInvent_logo.png');
      this.meta.setTag('twitter:image', '../../assets/images/ApogeeInvent_logo.png');
      if (this.activatedroute.snapshot.params['lead_id'] == null || typeof (this.activatedroute.snapshot.params['lead_id']) != 'undefined') {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id']);
      } else {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id']);
      }
    }
    // for geo
    if (this.product_id == '5d4d5f66c9e23d43cc1243a2') {
      this.meta.setTag('og:keyword', 'Residential GEO Fencing Solutions, Commercial GEO Fencing Solutions, Targeted GEO Fencing Solutions, Big Data GEO Fencing Solutions');
      this.meta.setTag('twitter:keyword', 'Residential GEO Fencing Solutions, Commercial GEO Fencing Solutions, Targeted GEO Fencing Solutions, Big Data GEO Fencing Solutions');
      this.meta.setTitle('GEOFenceDSP');
      this.meta.setTag('og:description', 'Targeted GEOFencing solutions with Big Data Integration for Residential and Commercial GEOFencing across multiple industries, offering unprecedented accuracy in display advertising campaigns.');
      this.meta.setTag('twitter:description', 'Targeted GEOFencing solutions with Big Data Integration for Residential and Commercial GEOFencing across multiple industries, offering unprecedented accuracy in display advertising campaigns.');
      this.meta.setTag('og:title', 'GEOFenceDSP');
      this.meta.setTag('twitter:title', 'GEOFenceDSP');
      this.meta.setTag('og:image', '../../assets/images/repdashboard_offer_img7.png');
      this.meta.setTag('twitter:image', '../../assets/images/repdashboard_offer_img7.png');
      if (this.activatedroute.snapshot.params['lead_id'] == null || typeof (this.activatedroute.snapshot.params['lead_id']) != 'undefined') {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id']);
      } else {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id']);
      }
    }
    // for MedWorldOne
    if (this.product_id == '5e4e634052b7254c601f7559') {
      this.meta.setTag('og:keyword', ' Buy & Sell Medical Equipment, List Medical Supplies, Premium Used Medical Equipment');
      this.meta.setTag('twitter:keyword', ' Buy & Sell Medical Equipment, List Medical Supplies, Premium Used Medical Equipment');
      this.meta.setTitle('Med World One');
      this.meta.setTag('og:description', ' A powerful one-stop marketplace for all things medical supplies, where Medical partners can list, sell or buy premium medical devices, equipment, and supplies, all under one roof.');
      this.meta.setTag('twitter:description', ' A powerful one-stop marketplace for all things medical supplies, where Medical partners can list, sell or buy premium medical devices, equipment, and supplies, all under one roof.');
      this.meta.setTag('og:title', 'Med World One');
      this.meta.setTag('twitter:title', 'Med World One');
      this.meta.setTag('og:image', '../../assets/images/MedWorldOne_logo.png');
      this.meta.setTag('twitter:image', '../../assets/images/MedWorldOne_logo.png');
      if (this.activatedroute.snapshot.params['lead_id'] == null || typeof (this.activatedroute.snapshot.params['lead_id']) != 'undefined') {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id']);
      } else {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id']);
      }
    }
    // for Helios Medical Marketing
    if (this.product_id == '5e4e675185f01a4ee4f0ac22') {
      this.meta.setTag('og:keyword', 'Medical Marketing Solutions, Big Data Medical Marketing, Medical Marketing Strategies');
      this.meta.setTag('twitter:keyword', 'Medical Marketing Solutions, Big Data Medical Marketing, Medical Marketing Strategies');
      this.meta.setTitle('Helios Medical Marketing');
      this.meta.setTag('og:description', 'Taking Marketing Campaigns to unique Medical Big Data audience in the largest digital marketplace in the global arena, and reaching target audiences in their very mobile devices.');
      this.meta.setTag('twitter:description', 'Taking Marketing Campaigns to unique Medical Big Data audience in the largest digital marketplace in the global arena, and reaching target audiences in their very mobile devices.');
      this.meta.setTag('og:title', 'Helios Medical Marketing');
      this.meta.setTag('twitter:title', 'Helios Medical Marketing');
      this.meta.setTag('og:image', '../../assets/images/MedWorldOne_logo.png');
      this.meta.setTag('twitter:image', '../../assets/images/MedWorldOne_logo.png');
      if (this.activatedroute.snapshot.params['lead_id'] == null || typeof (this.activatedroute.snapshot.params['lead_id']) != 'undefined') {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id']);
      } else {
        this.meta.setTag('og:url', this.pageurl + '/' + this.product_id + '/' + this.activatedroute.snapshot.params['rep_id'] + '/' + this.activatedroute.snapshot.params['lead_id']);
      }
    }
  }

   settimezone(){
     this.loading = true;
    this.cookeiservice.set('timezone',this.timezoneval);
    setTimeout(()=>{
      this.geteventarr();
    },1000);
  //   this.window.location.reload();
  }

  setdatetonull() {
    this.filterval5 = null;
    this.geteventarr();
  }
  startTime(item: any, flag: any){
    // console.log(item)
  //   this.youtube_url[key].safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url[key].link);
  if (flag == '1') {
    this.discov = false;
    item.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.link+'?start='+item.start);
  } else if (flag == '3') {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item.link);
    this.discov = true;
  } else {
    this.discov = false;
    item.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.link+'?start='+item.second_start);
  }
  //  console.log(item.safeSrc)
  }

  geteventarr() {
    this.loading = true;
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
      this.loading = false;
      this.allslots = res.data.slots_data;
      this.allslotslength = res.data.slots_data.length;
      this.lead_data = res.data.lead_data[0];
      console.log(this.lead_data)
      if (typeof(res.data.lead_data[0].firstname) == 'undefined' || res.data.lead_data[0].firstname == null) {
        this.leadflag = 1;
      } else{
        this.leadflag = 0;
      }
      if (this.lead_data != null && typeof(this.lead_data) != 'undefined' && this.lead_data.emailStatus == 'send') {
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
  discoveryYoutubeVideoPlay(val: any, template: TemplateRef<any>){
  //  console.log(val)
    this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+val.link+'?autoplay=1');
    // console.log(this.youtubeVideoUrl)
    this.modalRef3 = this.modal.show(template);
}

  slotview(){
    let cond = { "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [this.product_id]}, slots:{$type:'array'}, startdate:{
      $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
      $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
  }};
  const link = this._commonservice.nodesslurl + 'datalistforslot';
        this._http.post(link,{rep_id: this.activatedroute.snapshot.params['rep_id'],lead_id: this.activatedroute.snapshot.params['lead_id'], condition:cond}).subscribe((res:any) => {
            this.allslots = res.data.slots_data;
            this.allslotslength = res.data.slots_data.length;
            // this.timezoneval = this.allslots[0].timezone;
            // this.cookeiservice.set('timezone',this.allslots[0].timezone);
            // console.log(this.timezoneval,'this.timezoneval')
            if (this.lead_data.youtube == null && (this.timezoneval == '' || this.timezoneval == null || typeof(this.timezoneval) == 'undefined')) {
              this.timezoneval = this.allslots[0].timezone;
            }
            this.rep_data = res.data.rep_data[0];
            // console.log(this.rep_data,'+++')
            this.lead_data = res.data.lead_data[0];
            if (this.lead_data == null || typeof(this.lead_data) == 'undefined' || typeof(res.data.lead_data[0].firstname) == 'undefined' || res.data.lead_data[0].firstname == null) {
              this.leadflag = 1;
            } else {
              this.leadflag = 0;
            }
            if ( this.lead_data != null && typeof(this.lead_data) != 'undefined' &&this.lead_data.emailStatus == 'send') {
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
        });
  }
}
