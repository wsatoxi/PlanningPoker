/// <reference path="../typings/tsd.d.ts"/>
var pokerapp;
(function (pokerapp) {
    var Card = (function () {
        function Card() {
            this._option = {
                loop: true,
                pagination: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                paginationClickable: true,
                spaceBetween: 30,
                onSlideChangeStart: undefined
            };
            this._swip = null;
        }
        Card.prototype.create = function (targetContainer) {
            var target = this.getDocument().getElementById(targetContainer);
            target.className = targetContainer;
            this._bgColor = this.getColorParameter() || this.randomColor();
            this._fontColor = this.createComplementaryColor(this._bgColor);
            this.createCardsDom(target);
            this._option.onSlideChangeStart = this.onSlideChangeStart;
            this.createSwiper('.' + targetContainer, this._option);
            this.getDocument().bgColor = this._bgColor;
            return this._swip;
        };
        Card.prototype.getColorParameter = function () {
            var color = this.getSearchParameters().color;
            if (color) {
                if (/^[0-9a-fA-F]{6}$/.test(color)) {
                    return "#" + color;
                }
            }
            return null;
        };
        Card.prototype.getSearchParameters = function () {
            var params = {};
            var pair = this.getWindow().location.search.substring(1).split('&');
            for (var i = 0; pair[i]; i++) {
                var kv = pair[i].split('=');
                params[kv[0]] = kv[1];
            }
            return params;
        };
        Card.prototype.getWindow = function () {
            return window;
        };
        Card.prototype.getDocument = function () {
            return document;
        };
        Card.prototype.randomColor = function () {
            var color = Math.floor(Math.random() * 16777251).toString(16);
            color = '#' + ('000000' + color).slice(-6);
            return color;
        };
        Card.prototype.createComplementaryColor = function (baseColor) {
            var r, g, b;
            var rComp, gComp, bComp;
            r = parseInt(baseColor.substr(-6, 2), 16);
            g = parseInt(baseColor.substr(-4, 2), 16);
            b = parseInt(baseColor.substr(-2, 2), 16);
            var compBase = Math.min.apply(null, [r, g, b]) + Math.max.apply(null, [r, g, b]);
            rComp = compBase - r;
            gComp = compBase - g;
            bComp = compBase - b;
            var complementaryColor = '#' + ('00' + rComp.toString(16)).slice(-2) + ('00' + gComp.toString(16)).slice(-2) + ('00' + bComp.toString(16)).slice(-2);
            return complementaryColor;
        };
        Card.prototype.createCardsDom = function (parent) {
            if (!parent)
                throw Error('target container is null');
            var swiperWrapperElement = document.createElement('div');
            swiperWrapperElement.className = 'swiper-wrapper';
            var rand = Math.floor(Math.random() * Card.CARD_NUMBER.length + 1);
            for (var num in Card.CARD_NUMBER) {
                if (num == rand) {
                    this.createAdDom(swiperWrapperElement);
                }
                this.createCardDom(swiperWrapperElement, Card.CARD_NUMBER[num]);
            }
            var paginationElement = document.createElement('div');
            paginationElement.className = 'swiper-pagination';
            parent.appendChild(swiperWrapperElement);
            parent.appendChild(paginationElement);
            if (!this.isPhone()) {
                var nextButtonElement = document.createElement('div');
                nextButtonElement.className = 'swiper-button-next';
                var prevButtonElement = document.createElement('div');
                prevButtonElement.className = 'swiper-button-prev';
                parent.appendChild(nextButtonElement);
                parent.appendChild(prevButtonElement);
            }
        };
        Card.prototype.createCardDom = function (parent, cardNumber) {
            var swiperSlide = document.createElement('div');
            swiperSlide.className = 'swiper-slide';
            swiperSlide.textContent = cardNumber;
            swiperSlide.style.cssText = 'color : ' + this._fontColor + ';';
            parent.appendChild(swiperSlide);
        };
        Card.prototype.onSlideChangeStart = function (swiper) {
        };
        Card.prototype.isPhone = function () {
            var ua = navigator.userAgent;
            if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
                return true;
            }
            return false;
        };
        Card.prototype.createAdDom = function (parent) {
            parent.appendChild(this.getAd());
        };
        Card.prototype.getAd = function () {
            var adDom = document.createElement('div');
            var adscriptSrc = document.createElement('script');
            adscriptSrc.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            adscriptSrc.async = true;
            adDom.appendChild(adscriptSrc);
            var adProp = document.createElement('ins');
            adProp.className = 'adsbygoogle';
            adProp.style.cssText = 'display:inline-block;width:300px;height:250px';
            adProp.setAttribute('data-ad-client', 'ca-pub-8472024369429023');
            adProp.setAttribute('data-ad-slot', '2865948228');
            adDom.appendChild(adProp);
            var adscript = document.createElement('script');
            adscript.text = '(adsbygoogle = window.adsbygoogle || []).push({});';
            adDom.appendChild(adscript);
            adDom.className = 'swiper-slide';
            return adDom;
        };
        Card.prototype.createSwiper = function (targetContainer, option) {
            this._swip = new Swiper(targetContainer, option);
        };
        Card.CARD_NUMBER = ['?', '0', '1/2', '1', '2', '3', '5', '8', '13', '20', '40', '100', '∞'];
        return Card;
    })();
    pokerapp.Card = Card;
})(pokerapp || (pokerapp = {}));
//# sourceMappingURL=card.js.map