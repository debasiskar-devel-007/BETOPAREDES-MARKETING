import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import videojs from 'video.js';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-marketingreview-new',
  templateUrl: './marketingreview-new.component.html',
  styleUrls: ['./marketingreview-new.component.css']
})
export class MarketingreviewNewComponent implements OnInit {
  public exitfullscreenflag: boolean = false;
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
  public videolist: any = [{ name: 'Sale deck', flag: true, videodata: [{ url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/image-1637746453722SampleVideo_720x480_5mb.mp4', title: 'TM-FLOW REPORT', img: 'https://all-frontend-assets.s3.amazonaws.com/AWS-Physicians/images/dr_banner1.jpg', description: ' TM-FLOW REPORT. VASCULAR FUNCTION ASSESSMENT. HR: 77. Height 5 ,. Weight 168 Lbs. BMI: 26.3. CLINICAL CONTEXT. Physician Name:.' }, { url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/image-1637210549150PECEDoctorTrainingVideo.mp4', title: 'TM-FLOW REPORT', description: ' TM-FLOW REPORT. VASCULAR FUNCTION ASSESSMENT. HR: 77. Height 5 ,. Weight 168 Lbs. BMI: 26.3. CLINICAL CONTEXT. Physician Name:.' }] }, { name: 'Sales pitch', flag: false, videodata: [{ url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/image-16375886325607774485510954222850.mp4', title: 'TM-FLOW REPORT', description: ' TM-FLOW REPORT. VASCULAR FUNCTION ASSESSMENT. HR: 77. Height 5 ,. Weight 168 Lbs. BMI: 26.3. CLINICAL CONTEXT. Physician Name:.' }, { url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/image-1637210549150PECEDoctorTrainingVideo.mp4', title: 'TM-FLOW REPORT', description: ' TM-FLOW REPORT. VASCULAR FUNCTION ASSESSMENT. HR: 77. Height 5 ,. Weight 168 Lbs. BMI: 26.3. CLINICAL CONTEXT. Physician Name:.' }] }, { name: 'Software walkthrough', flag: false, videodata: [{ url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/image-16375886325607774485510954222850.mp4', title: 'TM-FLOW REPORT', description: ' TM-FLOW REPORT. VASCULAR FUNCTION ASSESSMENT. HR: 77. Height 5 ,. Weight 168 Lbs. BMI: 26.3. CLINICAL CONTEXT. Physician Name:.' }, { url: 'https://betoparedesallvideos.s3.amazonaws.com/betoparedesallvideos/image-1637210549150PECEDoctorTrainingVideo.mp4', title: 'Software walkthrough', description: ' TM-FLOW REPORT. VASCULAR FUNCTION ASSESSMENT. HR: 77. Height 5 ,. Weight 168 Lbs. BMI: 26.3. CLINICAL CONTEXT. Physician Name:.' }] }];


  public videolink: any = [];
  public video_url: any = '';
  public video_url1: any = '';
  public Change_video_percent: any = 0;
  public videotitle: any = '';
  public videodescription: any = '';
  public videotimeflag: any = false;
  public medigrade:any = 0;
  constructor(public api_service: ApiService,
    public activatedroute: ActivatedRoute, public snackBar: MatSnackBar, private sanitizer: DomSanitizer, public cookie: CookieService, public router: Router) {
    let endpoint = 'https://z2oo2a8oq9.execute-api.us-east-1.amazonaws.com/dev/api/marketiingreviewteach'
    let data = {};
    if(typeof (this.activatedroute.snapshot.queryParams.pid1) != 'undefined' && this.activatedroute.snapshot.queryParams.pid1 != null){
      data = {
        productid: [this.activatedroute.snapshot.queryParams.pid1],
        userid: this.activatedroute.snapshot.params.rep_id
      }
      if(typeof (this.activatedroute.snapshot.queryParams.pid2) != 'undefined' && this.activatedroute.snapshot.queryParams.pid2 != null){
        data = {
          productid: [this.activatedroute.snapshot.queryParams.pid1,this.activatedroute.snapshot.queryParams.pid2],
          userid: this.activatedroute.snapshot.params.rep_id
        }
      }
    }
    this.api_service.requestData(endpoint, data).subscribe((res: any) => {
      console.log(res);
      this.productdata = res.results.productdata;
      for (const key in this.productdata) {
        if (this.productdata[key]._id == '604aff3691b7c80008ca11a8') {
          this.medigrade++;
        }
        if (this.productdata[key]._id == '604a0b6e40962e00088f0d79') {
          this.medigrade++;
        }
      }
      this.techata = res.results.userdata[0];
      console.log(this.productdata, 'productdata', this.techata);
    })
  }

  ngOnInit() {
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
        var newarr = this.videolist[0].videodata[0].url.split("https://betoparedesallvideos.s3.amazonaws.com");
        let url = 'https://d291rlacfzbauk.cloudfront.net' + newarr[1];
        //   this.video_listtable.video_file.path + this.video_listtable.video_file.fileservername;
        this.cookie.set('video_url', url, undefined, '/');
        this.video_url = url;
        this.videotitle = this.videolist[0].videodata[0].title;
        this.videodescription = this.videolist[0].videodata[0].description;

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
  loadvideo() {

    setTimeout(() => {
      this.player = videojs('#my-video-modal');

      this.player.controls(false);
      console.log('onload section');// TO CONTROL FALSE

      this.video_currenttime = parseInt(this.player.currentTime());
      this.onprocess();
    }, 1000);
  }
  request_contract() {
    console.log(this.activatedroute.snapshot.params);
    let endpoint = 'https://z2oo2a8oq9.execute-api.us-east-1.amazonaws.com/dev/api/requestcontractfromlead'
    let data = {
      product_id: this.activatedroute.snapshot.params.product_id,
      lead_id: this.activatedroute.snapshot.params.lead_id,
      rep_id: this.activatedroute.snapshot.params.rep_id
    }
    this.api_service.requestData(endpoint, data).subscribe((res: any) => {
      this.snackBar.open('Contract Request Successfully', 'Ok', {
        duration: 3000,
      });
    })
  }

  videoplay(val, i) {

    console.log(val);
    for (const key in this.videolist) {
      this.videolist[key].flag = false;
    }
    this.videolist[i].flag = true;
    this.videolink = [];

    this.videolink = val.videodata;





  }

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

  playnext(val, i) {
    // this.player.currentTime(0)
    // this.player.dispose();
    // videojs('#my-video-modal').dispose();
    // this.cookie.delete('video_url');
    console.log(this.cookie.get('video_url'), 'video_url;;;;');

    console.log(val.url);
    // return;
    var newarr = val.url.split("https://betoparedesallvideos.s3.amazonaws.com");
    let url = 'https://d291rlacfzbauk.cloudfront.net' + newarr[1];
    // setTimeout(() => {
    this.cookie.set('video_url', url, undefined, '/');

    console.log(this.cookie.get('video_url'), 'video_url;;;===========;');

    this.videotitle = val.title;
    this.videodescription = val.description;
    this.cookie.set('videotitle', this.videotitle, undefined, '/');
    this.cookie.set('videodesc', this.videodescription, undefined, '/');
    // }, 500);

    setTimeout(() => {
      console.log('TEST________________-');

      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
    }, 1000);

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
    this.player.dispose();
  }
}
