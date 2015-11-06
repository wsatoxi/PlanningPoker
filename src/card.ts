/// <reference path="../typings/tsd.d.ts"/>

namespace pokerapp {
  export class Card{

    private static CARD_NUMBER : string[] = ['?','0','1/2','1','2','3','5','8','13','20','40','100','∞'];
    private _option : SwiperOptions = <any>{
        loop: true,
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        onSlideChangeStart : undefined
      };

    private _fontColor : string;
    private _bgColor : string;
    private _swip : Swiper = null;

    public create(targetContainer : string) : Swiper{
        var target : HTMLElement = this.getDocument().getElementById(targetContainer);
        target.className = targetContainer;

        this._bgColor = this.randomColor();
        this._fontColor = this.createComplementaryColor(this._bgColor);

        this.createCardsDom(target);
        this._option.onSlideChangeStart = this.onSlideChangeStart;
        this.createSwiper('.' + targetContainer, this._option);
        this.getDocument().bgColor = this._bgColor;

        return this._swip;
    }

    private getDocument() : Document {
      return document;
    }

    randomColor() : string {
      // var color : string = Math.floor(Math.random() * 16777251).toString(16);
      // color = '#' + ('000000' + color).slice(-6);
      // return color;
      return '#ff0000';
    }

    private createComplementaryColor(baseColor : string) : string{
      var r, g, b: number;
      var rComp, gComp, bComp: number;

      r = parseInt(baseColor.substr(-6,2),16);
      g = parseInt(baseColor.substr(-4,2),16);
      b = parseInt(baseColor.substr(-2,2),16);

      var compBase : number = Math.min.apply(null,[r,g,b]) + Math.max.apply(null,[r,g,b]);

      rComp = compBase - r;
      gComp = compBase - g;
      bComp = compBase - b;

      var complementaryColor : string = '#' + ('00' + rComp.toString(16)).slice(-2) + ('00' + gComp.toString(16)).slice(-2) + ('00' + bComp.toString(16)).slice(-2);

      return complementaryColor;
    }

    private createCardsDom(parent : HTMLElement) {
      if(!parent)
        throw Error('target container is null');

      var swiperWrapperElement : HTMLElement = document.createElement('div');
      swiperWrapperElement.className = 'swiper-wrapper';

      var rand : number = Math.floor( Math.random() * Card.CARD_NUMBER.length + 1 ) ;


      for(var num in Card.CARD_NUMBER){
        if(num == rand){
          this.createAdDom(swiperWrapperElement);
        }
        this.createCardDom(swiperWrapperElement, Card.CARD_NUMBER[num]);
      }

      var paginationElement : HTMLElement = document.createElement('div');
      paginationElement.className = 'swiper-pagination';

      parent.appendChild(swiperWrapperElement);
      parent.appendChild(paginationElement);

      if(!this.isPhone()){
        var nextButtonElement : HTMLElement = document.createElement('div');
        nextButtonElement.className = 'swiper-button-next';
        var prevButtonElement : HTMLElement = document.createElement('div');
        prevButtonElement.className = 'swiper-button-prev';
        parent.appendChild(nextButtonElement);
        parent.appendChild(prevButtonElement);
      }
    }

    private createCardDom(parent : HTMLElement, cardNumber : string){
        var swiperSlide : HTMLElement = document.createElement('div');
        swiperSlide.className = 'swiper-slide';
        swiperSlide.textContent = cardNumber;
        swiperSlide.style.cssText = 'color : ' + this._fontColor + ';';
        parent.appendChild(swiperSlide);
    }

    private onSlideChangeStart(swiper : Swiper) {
    }

    private isPhone() : boolean{
      var ua : string = navigator.userAgent;
      if(ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || ( ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
        return true;
      }

      return false;
    }

    private createAdDom(parent : HTMLElement){
      parent.appendChild(this.getAd());
    }

    private getAd() : HTMLElement {

      var adDom : HTMLElement = document.createElement('div');

      var adscriptSrc : HTMLScriptElement = document.createElement('script');
      adscriptSrc.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      adscriptSrc.async = true;
      adDom.appendChild(adscriptSrc);

      var adProp : HTMLElement = document.createElement('ins');
      adProp.className = 'adsbygoogle';
      adProp.style.cssText = 'display:inline-block;width:300px;height:250px';
      adProp.setAttribute('data-ad-client','ca-pub-8472024369429023');
      adProp.setAttribute('data-ad-slot','2865948228');

      adDom.appendChild(adProp);

      var adscript : HTMLScriptElement = document.createElement('script');
      adscript.text = '(adsbygoogle = window.adsbygoogle || []).push({});';

      adDom.appendChild(adscript);

      adDom.className = 'swiper-slide';

      return adDom;
    }

    private createSwiper(targetContainer : string, option : SwiperOptions) {
      this._swip = new Swiper(targetContainer,option);
    }
  }
}
