import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import videojs from 'video.js';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import allvideodata from './video_cat_list_all.json';
export interface BottomsheetData {
  data: any,
  name: any,
}


@Component({
  selector: 'app-marketingreview-new',
  templateUrl: './marketingreview-new.component.html',
  styleUrls: ['./marketingreview-new.component.css']
})
export class MarketingreviewNewComponent implements OnInit {
  public exitfullscreenflag: boolean = false;
  public video_all_data:any = {};
  public show: boolean = false;
  public disabled: boolean = false;
  public requestflag: boolean = false;
  public productdata: any;
  public techata: any;
  playerid: any = '';
  video_currenttime: any = 0;
  player: videojs.Player;
  videoplayflag: boolean = false;
  video_time: any = '0:0:0';
  public video_duration: any = '';
  public video_end_time: any = '0:0:0';
  public video_percent: any = 0;
  public posterimg: any;
  public progressSpinner: boolean = false;

  public videoJsConfigObj = {
    preload: 'metadata',
    controls: false,
    autoplay: true,
    overrideNative: true,
    techOrder: ['html5', 'flash'],
    html5: {
      nativeVideoTracks: false,
      nativeAudioTracks: false,
      nativeTextTracks: false,
      hls: {
        withCredentials: false,
        overrideNative: true,
        debug: true
      }
    }
  };
  public playpauseflag: any = false;
  // public videolist: any = [{
  //   name: 'Sale deck', flag: true, videodata:

  //     [
  //       { url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/image-1637746453722SampleVideo_720x480_5mb.mp4', title: 'TM-FLOW REPORT', img: 'https://all-frontend-assets.s3.amazonaws.com/AWS-Physicians/images/v1.JPG', description: ' TM-FLOW REPORT. VASCULAR FUNCTION ASSESSMENT. HR: 77. Height 5 ,. Weight 168 Lbs. BMI: 26.3. CLINICAL CONTEXT. Physician Name:.' },

  //       { url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/image-1637210549150PECEDoctorTrainingVideo.mp4', title: 'TM-FLOW REPORT test', img: 'https://all-frontend-assets.s3.amazonaws.com/AWS-Physicians/images/v1.JPG', description: ' TM-FLOW REPORT. VASCULAR FUNCTION ASSESSMENT. HR: 77. Height 5 ,. Weight 168 Lbs. BMI: 26.3. CLINICAL CONTEXT. Physician Name:.' },

  //     ]
  // },


  // {
  //   name: 'Sales pitch', flag: false, videodata:

  //     [{ url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/PECE-Sales-cript.mp4', img: 'https://all-frontend-assets.s3.amazonaws.com/AWS-Physicians/images/v1.JPG', title: 'PECE Sale Pitch', description: ' Our pitch script is designed to inform and grab the interest of your clients. By watching this video, you get to know what a salesperson tells his potential customer ( lead or practices ) about a product or service. Our perfectly designed product-based sales pitch is deeply involved with the final close of a deal. In order to become a successful salesperson, you have to sell yourself on what you are selling. Know your products, describe their benefits, and convince them that it is made for them. This video presents you with the complete enterprise system solution that works with every required staff member, including technicians, doctors, physician assistants, nurse practitioners, records keepers, and practice management. ' },

  //     ]


  // },



  // {
  //   name: 'Software walkthrough', flag: false, videodata:

  //     [

  //       { url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/PECE-demo.mp4', img: 'https://all-frontend-assets.s3.amazonaws.com/AWS-Physicians/images/v1.JPG', title: 'PECE Software Walk through', description: ' Our product-based software walkthrough converts prospects and demonstrates the testing and tment platform features. After completing your Beto Paredes main training and product-based training, you are introducing with product’s back-office features; from here, you can get a clear idea about the access of different tools back-office system. ' }
  //     ]
  // },
  // ];


  public videolink: any = [];
  public video_url: any = '';
  public video_url1: any = '';
  public Change_video_percent: any = 0;
  public videotitle: any = '';
  public videodescription: any = '';
  public videotimeflag: any = false;
  public medigrade: any = 0;
  // public pececontract: boolean = true;
  public pece_product_flag: boolean = false;
  public tmflow_product_flag: boolean = false;
  public medigrade_product_flag: boolean = false;
  public bioenergetics_rst_product_flag: boolean = false;
  public product_list: any = [];

  // public creditcontract: boolean = true;
  // public tmflowcontract: boolean = true;
  // public biocontract: boolean = true;
  // public rstcontract: boolean = true;
  // public warrantycontract: boolean = true;
  public userdetails: any = {};
  public parent_data: any = {};
  constructor(public api_service: ApiService, public dialog: MatDialog,
    public activatedroute: ActivatedRoute, public snackBar: MatSnackBar, private sanitizer: DomSanitizer, public cookie: CookieService, public router: Router, public bottomSheet: MatBottomSheet) {
    let endpoint = environment.api_url + 'api/marketiingreviewteach';
    let data = {};
    if (typeof (this.activatedroute.snapshot.queryParams.pid1) != 'undefined' && this.activatedroute.snapshot.queryParams.pid1 != null) {
      data = {
        productid: [this.activatedroute.snapshot.queryParams.pid1],
        userid: this.activatedroute.snapshot.params.rep_id
      }
      if (typeof (this.activatedroute.snapshot.queryParams.pid2) != 'undefined' && this.activatedroute.snapshot.queryParams.pid2 != null) {
        data = {
          productid: [this.activatedroute.snapshot.queryParams.pid1, this.activatedroute.snapshot.queryParams.pid2],
          userid: this.activatedroute.snapshot.params.rep_id
        }
      }
    }
    this.api_service.requestData(endpoint, data).subscribe((res: any) => {
      console.log(res);
      this.productdata = res.results.productdata;
      for (const key in this.productdata) {
        this.product_list[key] =  this.productdata[key]._id
        // if (this.productdata[key]._id == '604aff3691b7c80008ca11a8') {
        //   this.medigrade++;
        // }
        // if (this.productdata[key]._id == '604a0b6e40962e00088f0d79') {
        //   this.medigrade++;
        // }
      }
      if (this.product_list.includes('612c883f118c110009f02820') && this.product_list.includes('612c89242005f400082d5fb1')){
        this.bioenergetics_rst_product_flag=true
        const video_all_data = 
        console.log("this.bioenergetics_rst_product_flag ==> ",this.bioenergetics_rst_product_flag)
      }
      if (this.product_list.includes('604aff3691b7c80008ca11a8') && this.product_list.includes('604a0b6e40962e00088f0d79')){
        this.medigrade_product_flag=true
        this.video_all_data = allvideodata.flag_pece
        console.log("this.medigrade_product_flag ==> ",this.medigrade_product_flag)
        console.log("video_all_data ==> ",this.video_all_data)
      }
      if (!this.product_list.includes('604aff3691b7c80008ca11a8') && this.product_list.includes('604a0b6e40962e00088f0d79')){
        this.tmflow_product_flag=true
        const video_all_data = 
        console.log("this.tmflow_product_flag ==> ",this.tmflow_product_flag)
      }
      if (this.product_list.includes('604aff3691b7c80008ca11a8') && !this.product_list.includes('604a0b6e40962e00088f0d79')){
        this.pece_product_flag=true
        const video_all_data = 
        console.log("this.pece_product_flag ==> ",this.pece_product_flag)
      }

      this.techata = res.results.userdata[0];
      console.log(this.productdata, 'productdata', this.techata);
    })
    // this.firstcontractrequest();
    // this.parentdata();
    this.getoneleadfolderview();
  }

  ngOnInit() {
    
    console.log(this.posterimg, "posterimg");

    console.log(this.activatedroute.snapshot.queryParams);

    setTimeout(() => {
      if (this.cookie.check('video_url')) {
        console.log(this.cookie.get('video_url'));

        this.video_url = this.cookie.get('video_url');
        if (this.cookie.check('videotitle')) {
          this.videotitle = this.cookie.get('videotitle');
        }
        if (this.cookie.check('videodesc')) {
          this.videodescription = this.cookie.get('videodesc');

        }

      } else {
        console.log("Else block");

        // var newarr = this.videolist[0].videodata[0].url.split("https://betoparedesallvideos.s3.amazonaws.com");
        // let url = 'https://d291rlacfzbauk.cloudfront.net' + newarr[1];
        let url=""
        if (this.video_all_data.length > 0 && this.video_all_data[0].videodata.length > 0 ){
          url = this.video_all_data[0].videodata[0].url
          console.log("video_all_data url +++")

        }else{
          url = "https://d291rlacfzbauk.cloudfront.net/betoparedesallvideos/image-1637746453722SampleVideo_720x480_5mb.mp4"
          console.log("else url +++")
        }
        
        //   this.video_listtable.video_file.path + this.video_listtable.video_file.fileservername;
        this.cookie.set('video_url', url, undefined, '/');
        this.video_url = url;
        this.videotitle = "Demo Video";
        this.videodescription = "Default video";

        // let videotitledesc = {
        //   videotitle: this.videolist[0].videodata[0].title,
        //   videodesc: this.videolist[0].videodata[0].description

        // }
        this.cookie.set('videotitle', this.videotitle, undefined, '/');
        this.cookie.set('videodesc', this.videodescription, undefined, '/');

      }
      this.video_url1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url);
      this.videoplayflag = true;

      // console.log(this.videolist[0].videodata[0].url, newarr, url);
    }, 500);


    setTimeout(() => {
      this.player = videojs('#my-video-modal');

      this.player.controls(false);

      this.video_currenttime = parseInt(this.player.currentTime());
      this.video_duration = parseInt(this.player.duration());
      console.log(this.video_duration, 'onload section', this.video_currenttime);// TO CONTROL FALSE

      this.onprocess();
    }, 1000);


  }
  // parentdata() {
  //   let send_data = {
  //     id: this.activatedroute.snapshot.params.admin_id
  //   }
  //   this.api_service.requestData1(environment.api_url + 'api/getoneuser', send_data).subscribe((res: any) => {
  //     this.parent_data = res.result[0]
  //   })
  // }

  // firstcontractrequest() {
  //   let send_data = {
  //     "condition":
  //     {
  //       "id": this.activatedroute.snapshot.params.lead_id,
  //       "status": 1
  //     },
  //     "secret": this.cookie.get('secret'),
  //     "token": this.cookie.get('jwtToken'),
  //     "limit": 0,
  //     "skip": 0
  //   }
  //   this.api_service.requestData1(environment.api_url + 'api/firstcontractrequest', send_data).subscribe((res: any) => {
  //     if (res.res[0].contracts.length > 0) {
  //       for (const key in res.res[0].contracts) {
  //         if (res.res[0].contracts[key].contractflag == 'credit') {
  //           this.creditcontract = false;
  //         }
  //         if (res.res[0].contracts[key].contractflag == 'warrenty') {
  //           this.warrantycontract = false;
  //         }
  //         if (res.res[0].contracts[key].contractflag == 'Pece Contract') {
  //           this.pececontract = false;
  //         }
  //         if (res.res[0].contracts[key].contractflag == 'tmflow_contract') {
  //           this.tmflowcontract = false;
  //         }
  //         if (res.res[0].contracts[key].contractflag == 'BioEntergetics Contract') {
  //           this.biocontract = false;
  //         }
  //         if (res.res[0].contracts[key].contractflag == 'RST Sanexas Contract') {
  //           this.rstcontract = false;
  //         }
  //       }
  //     }
  //   })
  // }
  getoneleadfolderview() {
    let req_data = {
      "secret": this.cookie.get('secret'),
      "token": this.cookie.get('jwtToken'),
      "condition": {
        "id": "_id",
        "limit": 1,
        "skip": 0,
        "type": "lead",
        "_id": this.activatedroute.snapshot.params.lead_id
      }
    }
    this.api_service.requestData1(environment.api_url + 'api/getoneleadfolderview', req_data).subscribe((res: any) => {
      this.userdetails = res.results.userView[0];
      console.log(this.userdetails);

    })
  }

  // loadvideo() {

  //   setTimeout(() => {
  //     this.player = videojs('#my-video-modal');

  //     this.player.controls(false);
  //     console.log('onload section');// TO CONTROL FALSE

  //     this.video_currenttime = parseInt(this.player.currentTime());
  //     this.onprocess();
  //   }, 1000);
  // }
  // request_contract() {
  //   console.log(this.activatedroute.snapshot.params);
  //   let endpoint = 'https://z2oo2a8oq9.execute-api.us-east-1.amazonaws.com/dev/api/requestcontractfromlead'
  //   let data = {
  //     product_id: this.activatedroute.snapshot.params.product_id,
  //     lead_id: this.activatedroute.snapshot.params.lead_id,
  //     rep_id: this.activatedroute.snapshot.params.rep_id
  //   }
  //   this.api_service.requestData(endpoint, data).subscribe((res: any) => {
  //     this.snackBar.open('Contract Request Successfully', 'Ok', {
  //       duration: 3000,
  //     });
  //   })
  // }

  // newrequestcontract(val: any) {
  //   this.progressSpinner = true;
  //   let contractdata: any = {};
  //   let data: any = {};
  //   let ednpoint: any = '';
  //   if (val == 'pece') {
  //     contractdata.leadname = this.userdetails.fullname;
  //     contractdata.address = this.userdetails.address;
  //     contractdata.Serial = this.userdetails.Serial_Number;
  //     data = {
  //       lead_id: this.activatedroute.snapshot.params.lead_id,
  //       tech_id: this.activatedroute.snapshot.params.rep_id,
  //       product_id: '604aff3691b7c80008ca11a8',
  //       contractdata: contractdata,
  //       "contractflag": "Pece Contract",
  //       contracts: [
  //         {
  //           status: "requested by lead",
  //           added_by_id: this.userdetails._id,
  //           addedby: this.userdetails.firstname + ' ' + this.userdetails.lastname,
  //           addedondatetime: Math.round(new Date().getTime()),
  //           type: this.userdetails.type,
  //         },
  //       ],
  //       contact_id: this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0]._id : '',
  //     };
  //     ednpoint = 'api/request-contracts';
  //   }
  //   if (val == 'warranty') {
  //     contractdata.PracticeName =
  //       this.userdetails.fullname;
  //     contractdata.Street =
  //       this.userdetails.street;
  //     contractdata.City = this.userdetails.city;
  //     contractdata.State =
  //       this.userdetails.state;
  //     contractdata.Zip = this.userdetails.zip;
  //     contractdata.Phone =
  //       this.userdetails.phone;
  //     contractdata.auth_signatory =
  //       this.userdetails.singeealldata[0].First_Name +
  //       " " +
  //       this.userdetails.singeealldata[0].Last_Name;
  //     contractdata.printed_name =
  //       this.userdetails.singeealldata[0].First_Name +
  //       " " +
  //       this.userdetails.singeealldata[0].Last_Name;
  //     contractdata.equipment = 'TM-FLOW ANS MEDICAL DEVICE'
  //     data = {
  //       lead_id: this.activatedroute.snapshot.params.lead_id,
  //       tech_id: this.activatedroute.snapshot.params.rep_id,
  //       product_id: "",
  //       contractdata: contractdata,
  //       contractflag: "warrenty",
  //       contracts: [
  //         {
  //           status: "requested by lead",
  //           added_by_id: this.userdetails._id,
  //           addedby: this.userdetails.firstname + ' ' + this.userdetails.lastname,
  //           addedondatetime: Math.round(new Date().getTime()),
  //           type: this.userdetails.type,
  //         },
  //       ],
  //       contact_id: this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0]._id : '',
  //     };
  //     ednpoint = 'api/update-new_contract';
  //   }
  //   if (val == 'credit') {
  //     contractdata.Legal_Company_Name = this.userdetails.fullname;
  //     contractdata.address = this.userdetails.address;
  //     contractdata.city = this.userdetails.city;
  //     contractdata.state = this.userdetails.state;
  //     contractdata.zip = this.userdetails.zip;
  //     contractdata.website = this.userdetails.Website;
  //     contractdata.email = this.userdetails.email;
  //     contractdata.phonetwo = this.userdetails.phone;
  //     contractdata.compane_name = this.userdetails.company;
  //     contractdata.preson_name = this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0].First_Name + " " + this.userdetails.singeealldata[0].Last_Name : '';
  //     contractdata.homeaddress = this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0].Mailing_Street + "," + this.userdetails.singeealldata[0].Mailing_City + "," + this.userdetails.singeealldata[0].Mailing_State + "," + this.userdetails.singeealldata[0].Mailing_Country : '';
  //     contractdata.city_two = this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0].Mailing_City : '';
  //     contractdata.state_two = this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0].Mailing_State : '';
  //     contractdata.zip_two = this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0].Mailing_Zip : '';
  //     contractdata.home_phone = this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0].Phone : '';
  //     contractdata.signer = this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0].First_Name + " " + this.userdetails.singeealldata[0].Last_Name : '';
  //     contractdata.compane_name = this.userdetails.singeealldata.length > 0 ? this.userdetails.firstname : '';
  //     data = {
  //       lead_id: this.activatedroute.snapshot.params.lead_id,
  //       tech_id: this.activatedroute.snapshot.params.rep_id,
  //       product_id: '604a0b6e40962e00088f0d79',

  //       contracts: [
  //         {
  //           status: "requested by lead",
  //           added_by_id: this.userdetails._id,
  //           addedby: this.userdetails.firstname + ' ' + this.userdetails.lastname,
  //           addedondatetime: Math.round(new Date().getTime()),
  //           type: this.userdetails.type,
  //         },
  //       ],
  //       contractflag: "credit",
  //       contractdata: contractdata,
  //       contact_id: this.userdetails.singeealldata.length > 0 ? this.userdetails.singeealldata[0]._id : '',
  //     };
  //     ednpoint = 'api/request-contracts';
  //   }
  //   console.log(data);
  //   console.log(environment.api_url + ednpoint);

  //   this.api_service
  //     .requestData1(environment.api_url + ednpoint, data)

  //     .subscribe((res: any) => {
  //       // this.snackBar.open(res.successmsg, 'ok');

  //       const dialogRef = this.dialog.open(dialogpage, {

  //         panelClass: 'custom-modalbox'
  //       })
  //       dialogRef.afterClosed().subscribe(result => {
  //         console.log('The dialog was closed');
  //       });



  //       this.firstcontractrequest();
  //       this.getoneleadfolderview();
  //       setTimeout(() => {
  //         this.progressSpinner = false;
  //       }, 1500);
  //     });
  // }
  // videoplay(val, i) {

  //   console.log(val, "videoval+-+-");
  //   for (const key in this.videolist) {
  //     this.videolist[key].flag = false;
  //   }
  //   this.videolist[i].flag = true;
  //   console.log(this.videolist[i], "this.videolist[i]");

  //   // this.posterimg=this.videolist[i].videodata[0].img;
  //   // console.log(this.posterimg,"posterimg");

  //   this.videolink = [];

  //   this.videolink = val.videodata;

  // }

  bottomSheetVideoListOpen(val, index) {
    // this.videolist.val.videodata
    // console.log("videodata",allvideodata)
    this.video_all_data[index].videodata
    console.log(" this.video_all_data[index].name", this.video_all_data[index].name)
    const bottomSheetRef = this.bottomSheet.open(bottomSheetVideoList, {
      data: this.video_all_data[index],
      panelClass: ['genClass', 'videoGalleryModal']

    });
    bottomSheetRef.afterDismissed().subscribe((data) => {
      console.log("data==>",data)
      
      this.playnext(data)
    });
  }
  


  // openDialog(): void {
  //   const dialogRef = this.dialog.open(dialogpage, {
  //     panelClass: 'custom-modalbox'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');

  //   });
  // }


  onprocess() {
    console.log('ppppppp');

    this.videoplayflag = true;
    setTimeout(() => {
      this.video_currenttime = parseInt(this.player.currentTime());
      const sec_num = parseInt(this.video_currenttime, 10);
      const hours: any = Math.floor(sec_num / 3600);
      const minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
      const seconds: any = sec_num - (hours * 3600) - (minutes * 60);
      this.video_time = hours + ':' + minutes + ':' + seconds;
      setTimeout(() => {
        this.video_duration = parseInt(this.player.duration());
        const sec_duration_num = parseInt(this.video_duration, 10);
        const duration_hours: any = Math.floor(sec_duration_num / 3600);
        const duration_minutes: any = Math.floor((sec_duration_num - (duration_hours * 3600)) / 60);
        const duration_seconds: any = sec_duration_num - (duration_hours * 3600) - (duration_minutes * 60);
        this.video_end_time = duration_hours + ':' + duration_minutes + ':' + duration_seconds;
        this.videotimeflag = true;
        console.log(this.video_duration, 'audio_duration', this.video_end_time);

      }, 500);



      this.video_percent = (this.video_currenttime / this.video_duration) * 100;
    }, 1000);
  }
  playbtn() {   // FOR PLAY THE VIDEO
    console.log(this.player);
    this.playpauseflag = true;

    this.onprocess();

    this.player.play();
    console.log(this.player.cache_.currentTime, this.player.cache_.duration);

  }

  pausebtn() {  //FOR PAUSE THE VIDEO.
    console.log(this.player.cache_.currentTime, this.player.cache_.duration);
    this.playpauseflag = false;

    this.player.pause();
  }


  progressvideo(val) {
    let video_time: any;
    video_time = (this.Change_video_percent * this.video_duration) / 100;

    const sec_num = parseInt(video_time, 10);
    const hours: any = Math.floor(sec_num / 3600);
    const minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
    const seconds: any = sec_num - (hours * 3600) - (minutes * 60);
    this.video_time = hours + ':' + minutes + ':' + seconds;

    console.log(this.video_duration, this.video_percent, this.Change_video_percent, this.video_time);

    this.player.currentTime(parseInt(video_time));

  }
  skip(value) {
    this.player.currentTime(parseInt(this.player.currentTime() + value));
    console.log('currentTime', this.player.currentTime());
  }
  fullscreenview() {
    let elem = document.querySelector("video");
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch();
    } else {
      document.exitFullscreen();
    }
  }

  playnext(val) {
    this.videoplayflag = false;
    // this.video_currenttime =0;
    // this.video_duration = parseInt(this.player.duration());

    
    console.log(this.cookie.get('video_url'), 'video_url;;;;');

    let url = val.url
    // setTimeout(() => {
    this.cookie.set('video_url', url, undefined, '/');

    console.log(this.cookie.get('video_url'), 'video_url;;;===========;');
    this.posterimg = val.img;
    this.videotitle = val.title;
    this.videodescription = val.description;
    this.cookie.set('videotitle', this.videotitle, undefined, '/');
    this.cookie.set('videodesc', this.videodescription, undefined, '/');
    console.log(this.cookie.get('video_url'),this.cookie.get('videotitle'),this.cookie.get('videodesc'), 'Video related cookies');
    this.videoplayflag = true;
    
    this.onprocess();
    this.player.play();
    return
    // console.log(val.url, i, this.player);
    // // setTimeout(() => {
    // this.videoplayflag = false;

    // this.video_url = '';
    // this.video_url1 = '';
    // // setTimeout(() => {
    // // var video = document.getElementById('#my-video-modal');
    // var source = document.getElementById('source');

    // this.player.setAttribute('src', 'http://www.tools4movies.com/trailers/1012/Kill%20Bill%20Vol.3.mp4');


    // setTimeout(() => {
    //   var newarr = val.url.split("https://betoparedesallvideos.s3.amazonaws.com");
    //   let url = 'https://d291rlacfzbauk.cloudfront.net' + newarr[1];
    //   this.video_url = url;
    //   this.video_url1 = this.sanitizer.bypassSecurityTrustResourceUrl(this.video_url);
    //   this.videoplayflag = true;
    //   setTimeout(() => {
    //     this.player = videojs('#my-video-modal');

    //     this.player.controls(false);
    //     console.log('onload section');// TO CONTROL FALSE

    //     this.video_currenttime = parseInt(this.player.currentTime());
    //     this.onprocess();
    //   }, 50);

    // }, 1000);
    // // }, 50);/
    // // }, 1000);


  }
  
  ngOnDestroy() {
    // this.cookie.delete('video_url')
    // this.player.dispose();
  }
}



@Component({
  selector: 'dialogpage',
  templateUrl: 'dialogpage.html',
})
export class dialogpage {
  constructor(
    public dialogRef: MatDialogRef<dialogpage>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'bottomSheetVideoList',
  templateUrl: 'bottomSheetVideoList.html',
  styleUrls: ['./marketingreview-new.component.css']
})
export class bottomSheetVideoList {
  public modaldata: any;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public bottomSheetData: BottomsheetData,private _bottomSheetRef: MatBottomSheetRef<bottomSheetVideoList>) {
    this.modaldata = bottomSheetData
  }

  videoPlayIcon: string = 'https://all-frontend-assets.s3.amazonaws.com/transcendentpagan/assets/images/playicon.png';

  clickOpenVideo(val){
    console.log("video_val ==>",val)
    this._bottomSheetRef.dismiss(val);
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
