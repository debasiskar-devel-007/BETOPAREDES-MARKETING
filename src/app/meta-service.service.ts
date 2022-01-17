import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  private defaultTitle = 'peceportal frontend';
  private defaultKeywords = 'peceportal frontend';
  private defaultDescription = 'peceportal frontend';
  private defaultRobots = 'peceportal frontend';
  private defaultOgTitle = 'peceportal frontend';
  private defaultOgUrl = '';
  private defaultOgType = 'website';
  private defaultOgDescription = 'website';
  private defaultOgImage = 'https://all-frontend-assets.s3.amazonaws.com/pece/assets/images/og_image.jpg';
  private defaultTwitterCard = 'summery .. ';

  constructor(private titleService: Title, private metaService: Meta) { }

  setmeta(data: any) {

    // console.log(data, "test metaservices")

    this.titleService.setTitle((data.title == null) ? this.defaultTitle : data.title);
    this.metaService.addTags([
      { name: 'keywords', content: (data.keywords == null) ? this.defaultKeywords : data.keywords }
    ]);
    this.metaService.addTags([
      { name: 'description', content: (data.description == null) ? this.defaultDescription : data.description }
    ]);
    this.metaService.addTags([
      { name: 'robots', content: (data.robots == null) ? this.defaultRobots : data.robots }
    ]);

    this.metaService.addTags([
      { name: 'og:title', content: (data.og_title == null) ? this.defaultOgTitle : data.og_title }
    ]);
    this.metaService.addTags([
      { name: 'og:url', content: (data.og_url == null) ? this.defaultOgUrl : data.og_url }
    ]);
    this.metaService.addTags([
      { name: 'og:type', content: (data.og_type == null) ? this.defaultOgType : data.og_type }
    ]);
    this.metaService.addTags([
      { name: 'og:description', content: (data.og_description == null) ? this.defaultOgDescription : data.og_description }
    ]);
    this.metaService.addTags([
      { name: 'og:image', content: (data.og_image == null) ? this.defaultOgImage : data.og_image }
    ]);
    this.metaService.addTags([
      { name: 'twitter:card', content: (data.twitter_card == null) ? this.defaultTwitterCard : data.twitter_card }
    ]);

  }
}
